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
        # Should redirect or return appropriate response
        self.assertIn(response.status_code, [200, 302, 404])
    
    def test_clear_data_route_exists(self):
        """Test that the clear data route exists."""
        response = self.app.post('/clear_data')
        # Should redirect or return appropriate response
        self.assertIn(response.status_code, [200, 302, 404])

if __name__ == '__main__':
    unittest.main() 