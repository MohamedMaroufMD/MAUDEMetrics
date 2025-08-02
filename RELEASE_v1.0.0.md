# MAUDEMetrics v1.0.0: Initial Release

MAUDEMetrics is a Python-based, Docker-compatible web application that democratizes access to MAUDE data by automating extraction, aggregation, and descriptive analysis of adverse event reports via the openFDA Device Event API.

## 🚀 Key Features

- **Automated Data Extraction**: Built-in pagination handling for datasets up to 10,000+ records
- **Multi-Parameter Search**: Support for complex queries across brand names, product codes, manufacturers, product class, and date ranges
- **Professional Export System**: Multi-sheet exports with raw data, narrative reports, processed analytics, and summary statistics
- **Interactive Analytics Dashboard**: Built-in visualization capabilities for event analysis
- **Docker Containerization**: Complete containerization for reproducible deployment
- **Comprehensive Documentation**: JOSS paper and academic documentation included

## 📊 Technical Capabilities

- **Scalable Architecture**: Flask-based web application with SQLite database
- **API Integration**: Direct integration with openFDA Device Event API
- **Data Processing**: Automated processing of over 100 FDA data fields
- **Professional Reporting**: Multi-sheet Excel exports with consistent formatting
- **Error Handling**: Robust validation and error recovery mechanisms

## 🛠️ Installation

```bash
git clone https://github.com/MohamedMaroufMD/MAUDEMetrics.git
cd MAUDEMetrics
docker-compose up --build
```

The application will be available at `http://localhost:5005`

## 📚 Documentation

- **JOSS Paper**: Complete academic paper included in `paper.md`
- **CITATION.cff**: Proper academic citation metadata
- **README.md**: Comprehensive usage instructions
- **Testing**: Basic functionality tests included

## 🔬 Research Applications

- Systematic reviews of device-specific adverse events
- Clinical quality assurance and risk assessment
- Regulatory compliance and postmarket surveillance
- Educational purposes for health data science

## 📋 What's Included

### Core Application
- `app.py`: Main Flask application with API integration
- `templates/`: HTML templates for web interface
- `static/`: CSS styling and static assets
- `bridge/`: Kubernetes deployment configurations

### Documentation
- `paper.md`: Complete JOSS paper
- `CITATION.cff`: Academic citation metadata
- `README.md`: Comprehensive usage guide
- `CODE_OF_CONDUCT.md`: Community guidelines

### Testing & Validation
- `tests/`: Basic functionality tests
- `JOSS_SUBMISSION_CHECKLIST.md`: JOSS submission checklist

### Deployment
- `Dockerfile`: Docker containerization
- `docker-compose.yml`: Docker Compose configuration
- `requirements.txt`: Python dependencies

## 🔧 Technical Details

### Data Processing
- Handles FDA API pagination (1000 records per request)
- Processes 100+ FDA data fields
- Automated data cleaning and standardization
- Professional Excel export with multiple sheets

### Search Capabilities
- Brand name search with phrase matching
- Product code search with wildcard support
- Manufacturer search with partial matching
- Product class search with FDA naming variations
- Date range filtering

### Export Features
- **Raw_Events**: Complete event data with all FDA fields
- **MDR_Texts**: Narrative reports and problem descriptions
- **Custom_Events**: Processed data with enhanced formatting
- **Summary**: Statistical summaries and demographics

## 🎯 Use Cases

### For Researchers
- Conduct systematic reviews of device safety
- Analyze adverse event trends over time
- Compare safety profiles across devices
- Generate data for regulatory submissions

### For Healthcare Institutions
- Monitor device performance in clinical settings
- Conduct internal safety audits
- Support quality assurance programs
- Educational training for staff

### For Regulatory Affairs
- Postmarket surveillance activities
- Safety signal detection
- Regulatory compliance reporting
- Comparative effectiveness studies

## 📈 Performance

- Tested with datasets up to 10,000+ records
- Optimized database queries with proper indexing
- Memory-efficient processing for large datasets
- Responsive web interface for various screen sizes

## 🔒 Security & Privacy

- Input sanitization and validation
- Secure database operations
- No storage of sensitive patient information
- Research and educational use only

## 📄 License

Apache 2.0 License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see CODE_OF_CONDUCT.md for guidelines.

## 📞 Support

- **GitHub Issues**: https://github.com/MohamedMaroufMD/MAUDEMetrics/issues
- **Documentation**: See README.md for detailed usage instructions
- **Academic Citation**: Use CITATION.cff for proper citation

---

**⚠️ Important Notice**: For research and educational purposes only. Not for clinical decision-making.

**🔗 Related Links**:
- [openFDA API](https://open.fda.gov/apis/device/event/)
- [FDA MAUDE Database](https://www.fda.gov/medical-devices/mandatory-reporting-requirements-manufacturers-importers-and-device-user-facilities/manufacturer-and-user-facility-device-experience-maude)
- [JOSS Paper](paper.md) 