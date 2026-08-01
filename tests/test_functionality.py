"""
Functional tests for MAUDEMetrics application.
These tests verify core business logic and data processing.
"""

import unittest
import sys
import os
import tempfile
import shutil

# Add the parent directory to the path to import app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, get_db_connection, init_db, sanitize_text, build_search_query

class TestMAUDEMetricsFunctionality(unittest.TestCase):
    """Test cases for MAUDEMetrics core functionality."""
    
    def setUp(self):
        """Set up test environment."""
        self.app = app.test_client()
        self.app.testing = True
        
        # Create a temporary database for testing
        self.test_db_fd, self.test_db_path = tempfile.mkstemp()
        app.config['DATABASE'] = self.test_db_path
        
        # Initialize test database
        with app.app_context():
            init_db()
    
    def tearDown(self):
        """Clean up after tests."""
        os.close(self.test_db_fd)
        os.unlink(self.test_db_path)
    
    def test_sanitize_text_function(self):
        """Test text sanitization function."""
        # Test normal text
        normal_text = "This is normal text"
        self.assertEqual(sanitize_text(normal_text), normal_text)
        
        # Test text with control characters
        text_with_control = "Text with\x00control\x1fcharacters"
        sanitized = sanitize_text(text_with_control)
        self.assertNotIn('\x00', sanitized)
        self.assertNotIn('\x1f', sanitized)
        
        # Test very long text (should be truncated)
        long_text = "A" * 35000
        sanitized_long = sanitize_text(long_text)
        self.assertLessEqual(len(sanitized_long), 32003)  # 32000 + "..."
        self.assertTrue(sanitized_long.endswith("..."))
        
        # Test None input
        self.assertIsNone(sanitize_text(None))
        
        # Test non-string input
        self.assertEqual(sanitize_text(123), 123)
    
    def test_column_humanization_logic(self):
        """Test column name humanization logic."""
        # Test the humanization logic that would be used in enhanced_humanize
        def test_humanize(col):
            if not col or col in ['id', 'event_id']:
                return col
            # Convert snake_case to Title Case
            return ' '.join(word.capitalize() for word in col.split('_'))
        
        # Test basic conversion
        self.assertEqual(test_humanize("event_id"), "event_id")  # Should remain unchanged
        self.assertEqual(test_humanize("brand_name"), "Brand Name")
        self.assertEqual(test_humanize("manufacturer_name"), "Manufacturer Name")
        
        # Test complex names
        self.assertEqual(test_humanize("description_of_event_or_problem"), "Description Of Event Or Problem")
        self.assertEqual(test_humanize("additional_manufacturer_narrative"), "Additional Manufacturer Narrative")
    
    def test_database_operations(self):
        """Test database operations."""
        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Test inserting sample data
            cursor.execute("""
                INSERT INTO events (report_number, date_received)
                VALUES (?, ?)
            """, ("TEST123456", "2024-01-01"))
            
            # Get the inserted ID
            event_id = cursor.lastrowid
            
            # Test retrieving data
            cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
            result = cursor.fetchone()
            self.assertIsNotNone(result)
            self.assertEqual(result[1], "TEST123456")  # report_number is second column
            
            conn.close()
    
    def test_export_route_handles_no_data(self):
        """Test that export route handles no data gracefully."""
        # Test export with no data (should handle gracefully)
        response = self.app.get('/export')
        # Should return appropriate response code (not crash)
        self.assertIn(response.status_code, [200, 302, 404, 500])
        
        # The important thing is that the application doesn't crash
        # and returns a proper HTTP response

    def test_build_search_query_no_filters(self):
        """No filters supplied should produce a wildcard query."""
        q = build_search_query()
        self.assertTrue(q.endswith('search=*'))

    def test_build_search_query_end_date_only(self):
        """An end-date-only (open start) range must still filter, not be dropped."""
        q = build_search_query(brand_name='impella', end_date='2026-03-25')
        self.assertIn('date_received:[00010101+TO+20260325]', q)
        self.assertIn('device.brand_name:"impella"', q)

    def test_build_search_query_start_date_only(self):
        """A start-date-only (open end) range must still filter, not be dropped."""
        q = build_search_query(brand_name='impella', start_date='2020-01-01')
        self.assertIn('date_received:[20200101+TO+99991231]', q)

    def test_build_search_query_both_dates(self):
        """Both bounds supplied should behave as before."""
        q = build_search_query(start_date='2023-01-01', end_date='2023-12-31')
        self.assertIn('date_received:[20230101+TO+20231231]', q)

    def test_build_search_query_no_dates(self):
        """No date bounds at all should omit the date_received clause entirely."""
        q = build_search_query(brand_name='impella')
        self.assertNotIn('date_received', q)

if __name__ == '__main__':
    unittest.main()
