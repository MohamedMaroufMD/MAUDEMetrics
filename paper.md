---
title: 'MAUDEMetrics: Open-Source Automated Extraction and Standardization of FDA MAUDE Adverse Event Data'
tags:
  - medical devices
  - FDA
  - MAUDE database
  - adverse events
  - postmarket surveillance
  - openFDA API
  - Python
  - reproducible research
  - health informatics
  - regulatory science
  - data standardization
  - no-code
  - FAIR data
authors:
  - name: Mohamed Marouf
    orcid: 0000-0001-7480-371X
    affiliation: "1"
affiliations:
  - index: 1
    name: Faculty of Medicine, Mansoura University, Mansoura, Egypt
    ror: 01k8vtd75
date: 10 June 2026
bibliography: paper.bib
---

# Summary

The FDA Manufacturer and User Facility Device Experience (MAUDE) database [@fda_maude] holds over 23 million adverse event reports and is the primary U.S. resource for post-market medical device surveillance. Despite its importance, a 2024 systematic audit found that only 23.3% of published MAUDE-based queries could be independently reproduced — a reproducibility crisis rooted in undocumented extraction methods, inconsistent field handling, and reliance on access routes that impose hard record limits [@li2024].

**MAUDEMetrics** is an open-source, no-code desktop application and Docker-deployable web service that directly targets this failure mode. A researcher specifies one or more search parameters — brand name, product code, manufacturer, device class, or date range — through a graphical interface and receives a fully standardized, analysis-ready dataset in minutes, with no command-line interaction or programming required. Under the hood, the software automates full-dataset extraction from the openFDA Device Event API [@openfda_api], applies a deterministic four-step standardization pipeline across 100+ fields, and produces three complementary export formats. It ships as signed native installers for macOS (Apple Silicon and Intel) and Windows, alongside a Docker image for server and containerized workflows.

Correctness is independently verified against FDA authoritative quarterly raw device files spanning a wide range of dataset sizes and device categories, and performance has been benchmarked across multiple hardware configurations. Full validation protocols and results are reported in a companion preprint [@marouf2026preprint]. Complete installation instructions and usage documentation are provided in the repository README.

# Statement of Need

The reproducibility crisis in MAUDE-based research is well-documented. Li et al. screened 523 PubMed-indexed MAUDE publications and found that only 60 contained executable queries; of those, only 14 (23.3%) reproduced their originally reported record counts within a ±5% tolerance [@li2024]. The underlying causes are structural: existing access routes impose hard record limits, omit key fields, and provide no mechanism for standardizing outputs across research groups.

Three pathways currently exist for accessing MAUDE data, and each imposes a distinct barrier:

1. **FDA Web Portal**: Limited to 500 records per export and omits essential demographic fields, making it unsuitable for any moderate or large-scale study.
2. **openFDA Device Event API** [@openfda_api]: Programmatic and field-complete, but requires fluency with cursor-based `search_after` pagination to bypass a hard 26,000-record offset ceiling — a technical barrier that excludes researchers without programming expertise and that, when handled incorrectly, silently truncates datasets without warning.
3. **Raw Quarterly Device Files**: Comprehensive but require substantial local storage, a relational database, and manual field-code mapping with no accompanying documentation.

No existing open-source tool integrates all three concerns: circumventing record limits, validating extraction completeness against an authoritative reference, and producing standardized, field-documented outputs. MAUDEMetrics fills this gap for clinical researchers, hospital quality-assurance teams, regulatory professionals, and systematic review authors who need reproducible, complete MAUDE datasets without a software engineering background.

# State of the Field

Several tools and approaches exist for accessing MAUDE data, but none resolves the reproducibility gap identified by Li et al. [@li2024]:

- **FDA MAUDE Web Portal**: The official free interface supports basic search but is constrained to 500 records per export and omits demographic fields present in the API.
- **Direct openFDA API use**: Provides full field access and supports programmatic research workflows, but requires Python proficiency for cursor-state pagination; naive offset-based queries silently cap datasets at 26,000 records.
- **Raw quarterly device files**: Complete and authoritative, but the engineering setup (database infrastructure, substantial storage, custom ETL pipelines) lies beyond the resources of most clinical research groups.
- **Commercial surveillance platforms**: Closed-source, subscription-based, and designed for industry use — not compatible with open, reproducible academic workflows.

The only identified open-source Python library specifically targeting MAUDE data, PyMAUDE [@pymaudegithub], accesses FDA quarterly raw file downloads rather than the openFDA API, requires approximately 100 MB per year for device data files, provides no graphical interface or export pipeline, and is explicitly documented as not yet externally useable with no published release. MAUDEMetrics addresses a complementary use case: real-time API-based extraction without local file management, a no-code interface accessible to researchers without programming expertise, and a validated standardization layer that produces immediately analysis-ready outputs.

MAUDEMetrics is, to our knowledge, the first openly released MAUDE tool designed for non-programmers that combines automated full-dataset extraction, explicit gold-standard recall validation, and a deterministic standardization pipeline. Unlike convenience-oriented wrappers, its design rationale is reproducibility: every extraction is governed by documented field mappings and pinned dependencies that enable independent replication.

# Software Design

MAUDEMetrics is built on a Flask 2.3.3 web backend [@flask] running Python 3.11+ [@python3], packaged into native desktop applications using Electron 28 [@electron] and PyInstaller [@pyinstaller], with Docker [@docker] support for containerized deployment. Electron was chosen over a hosted web service to eliminate server infrastructure requirements and enable offline use — important for clinical and regulatory environments with network restrictions. The architecture follows a strict separation of concerns across four modules: extraction, persistence, standardization, and export.

![MAUDEMetrics architecture and data-flow diagram. User queries enter the web interface, triggering the Flask backend to execute cursor-paginated openFDA API requests. Retrieved records are cached in SQLite, processed through the four-step standardization pipeline, and routed to one of three export engines.](MAUDEMetrics_Workflow.png)

**Extraction engine.** The core function `fetch_all_API_data()` implements openFDA's `search_after` cursor mechanism with exponential-backoff retry logic using the requests HTTP library [@requests]. Each batch request returns up to 1,000 records (or 500 without an API key) along with a cursor token; the engine iterates until the API signals exhaustion, bypassing the 26,000-record ceiling that affects offset-based pagination. Rate-limit responses (HTTP 429) trigger automatic backoff without user intervention. Cursor-based iteration was adopted over offset pagination specifically because offset queries silently truncate large datasets — the primary mechanism underlying the reproducibility failures documented by Li et al. [@li2024].

**Persistence layer.** Extracted records are stored in a local SQLite database [@sqlite] with a normalized schema (events, devices, patients, mdr\_texts). SQLite was selected for its zero-configuration, single-file portability — researchers can archive, share, or version-control their extracted database without a database server. Repeat queries on already-cached datasets return within one second, eliminating redundant API calls and reducing load on public infrastructure.

**Standardization pipeline.** Raw openFDA JSON is processed using Pandas [@mckinney2010] and NumPy [@numpy] through four sequential, deterministic steps. The pipeline is intentionally non-configurable: determinism ensures that the same query always produces identical output, directly addressing the inconsistency that makes MAUDE results difficult to reproduce across research groups.

1. *Field humanization*: Maps 100+ API field codes to clinical terminology and flattens nested JSON arrays.
2. *Demographic aggregation*: Parses patient sub-arrays and computes descriptive statistics (median age, sex distribution, race/ethnicity).
3. *Date normalization*: Converts YYYYMMDD strings to ISO 8601; malformed or absent dates are assigned explicit null values rather than propagating errors downstream.
4. *Narrative integration*: Concatenates multi-part MDR text fields and sanitizes Unicode artifacts.

Field mappings are documented in a controlled-vocabulary file committed to the repository, making the standardization process independently auditable.

**Export engine.** Three complementary export modes are available. OpenPyXL's [@openpyxl] `write_only` streaming mode was chosen for the Excel export specifically to prevent out-of-memory failures on large datasets — a known failure mode when using standard worksheet mode with arrays exceeding tens of thousands of rows.

- *Optimized Excel*: A cleaned, analysis-ready workbook generated using an O(1) dictionary-lookup strategy with `write_only` streaming.
- *Summary Statistics*: A lightweight standalone workbook of aggregated patient demographics and event frequency tables.
- *Raw ZIP Archive*: Five CSV files preserving the original openFDA JSON hierarchy, ensuring no analytical metadata is discarded.

**Analytics dashboard.** An interactive web dashboard provides exploratory analysis without requiring a data export: event type distributions, patient demographic breakdowns (age, sex, race, ethnicity), manufacturer frequency tables, and device problem category summaries are computed on-the-fly from the local cache using dynamic multi-select filters.

**Testing.** A pytest-based test suite covers core API routes, database schema integrity, data processing functions, and text sanitization logic. Tests run automatically on every push via a GitHub Actions CI workflow, ensuring ongoing correctness as the codebase evolves.

**Deployment.** Pre-built, signed installers are distributed via GitHub Releases for macOS Apple Silicon (.dmg arm64), macOS Intel (.dmg x64), and Windows (.exe via NSIS). A Docker Compose configuration is provided for server deployment and reproducible containerized workflows. An auto-update mechanism checks GitHub Releases on application launch.

# Research Impact Statement

The software has been independently validated for completeness and performance across multiple hardware configurations, dataset scales spanning three orders of magnitude, and five distinct FDA product categories. Validation compared MAUDEMetrics outputs record-for-record against FDA authoritative quarterly raw device files, and timed benchmarks were conducted against both the FDA web portal and manual extraction workflows. An end-to-end extraction of a large real-world adverse-event dataset was completed in minutes on commodity hardware, demonstrating production-scale usability. Full validation protocols, quantitative results, and case-study data are reported in a companion preprint [@marouf2026preprint].

The software is freely available under the Apache License 2.0, archived on Zenodo with a persistent DOI (10.5281/zenodo.16691960), and distributed as signed pre-built installers to lower the adoption barrier for clinical and regulatory researchers. The tool targets a well-defined underserved community — clinical and translational researchers who rely on MAUDE data but lack programming expertise — and addresses a documented, quantified failure mode in the published literature [@li2024]. As the medical device landscape grows in complexity, particularly with AI-enabled and software-as-medical-device products generating new categories of adverse events, accessible and reproducible MAUDE analysis tools are increasingly important for early safety signal detection and evidence generation.

# AI Usage Disclosure

During software development, generative AI tools — including OpenAI ChatGPT, Google Gemini, Anthropic Claude, and DeepSeek — were consulted in an advisory capacity for guidance on specific implementation challenges, including API integration patterns, library usage, and bug resolution. This use is analogous to consulting technical documentation or developer forums; all architectural decisions, software design, core algorithmic logic, and validation methodology were conceived and implemented by the author.

# Acknowledgements

The author thanks Yousef Hawas and Ibraheem M. Alkhawaldeh for conducting independent validation testing across multiple hardware configurations, Alina Ghazou and Aya Awad for user feedback and feature suggestions that shaped the tool's development, and Ahmed Negida for supervision and critical review. The openFDA program (U.S. Food and Drug Administration / National Library of Medicine) is gratefully acknowledged for providing open, documented API access to MAUDE data. No financial support was received for this work.

# References
