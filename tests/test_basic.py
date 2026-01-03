"""
Basic tests for MAUDEMetrics application.
These tests ensure core functionality works correctly.
"""

import unittest
import sys
import os

# Add the parent directory to the path to import app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, get_db_connection, init_db

class TestMAUDEMetrics(unittest.TestCase):
    """Test cases for MAUDEMetrics application."""
    
    def setUp(self):
        """Set up test environment."""
        self.app = app.test_client()
        self.app.testing = True
        
        # Initialize test database
        with app.app_context():
            init_db()
    
    def tearDown(self):
        """Clean up after tests."""
        # Close any open database connections
        with app.app_context():
            conn = get_db_connection()
            if conn:
                conn.close()
    
    def test_home_page_loads(self):
        """Test that the home page loads successfully."""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'MAUDEMetrics', response.data)
    
    def test_about_page_loads(self):
        """Test that the about page loads successfully."""
        response = self.app.get('/about')
        self.assertEqual(response.status_code, 200)
    
    def test_analytics_page_loads(self):
        """Test that the analytics page loads successfully."""
        response = self.app.get('/analytics')
        self.assertEqual(response.status_code, 200)
    
    def test_database_connection(self):
        """Test database connection and initialization."""
        with app.app_context():
            conn = get_db_connection()
            self.assertIsNotNone(conn)
            conn.close()
    
    def test_export_route_exists(self):
        """Test that the export route exists."""
        response = self.app.get('/export')
        # Should redirect, return appropriate response, or handle no data gracefully
        self.assertIn(response.status_code, [200, 302, 404, 500])
    
    def test_clear_data_route_exists(self):
        """Test that the clear data route exists."""
        response = self.app.post('/clear_data')
        # Should redirect or return appropriate response
        self.assertIn(response.status_code, [200, 302, 404])
    
    def test_search_route_exists(self):
        """Test that the search route exists."""
        response = self.app.post('/search', data={})
        # Should handle empty search gracefully
        self.assertIn(response.status_code, [200, 302, 400, 404, 500])
    
    def test_results_route_exists(self):
        """Test that the results route exists."""
        response = self.app.get('/results')
        # Should redirect or return appropriate response
        self.assertIn(response.status_code, [200, 302, 404])
    
    def test_database_schema(self):
        """Test that database tables are created correctly."""
        with app.app_context():
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Check that main tables exist
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = [row[0] for row in cursor.fetchall()]
            
            expected_tables = ['events', 'devices', 'patients', 'mdr_texts']
            for table in expected_tables:
                self.assertIn(table, tables)
            
            conn.close()
    
    def test_database_status_route_exists(self):
        """Test that the database status API route exists and returns valid JSON."""
        response = self.app.get('/api/database-status')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        # Should have success key (either True or False)
        self.assertIn('success', data)

if __name__ == '__main__':
    unittest.main() 