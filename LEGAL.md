# Legal & Data Compliance

## Source Data License

All adverse event data retrieved by MAUDEMetrics originates from the FDA's
[Manufacturer and User Facility Device Experience (MAUDE) database](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm),
served through the [openFDA platform](https://open.fda.gov/).

This data is released by the U.S. Food and Drug Administration under the
**[Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)**
dedication, which places it in the public domain. No restrictions apply to use,
reproduction, redistribution, or commercial application, and no attribution is required.

> Full terms: https://open.fda.gov/terms/  
> Data license: https://open.fda.gov/license/

## How MAUDEMetrics Accesses Data

MAUDEMetrics retrieves data **exclusively** through the official openFDA REST API
(`https://api.fda.gov/device/event.json`) — the programmatic access platform
established by the FDA for public use by researchers, developers, and the public.

- **No web scraping.** No HTML pages are parsed or scraped.
- **No unauthorized access.** Only publicly accessible, unauthenticated endpoints
  are used. No authentication-protected or restricted endpoints are accessed.
- **Rate-limit compliance.** The tool respects openFDA's published rate limits.
  An optional FDA-issued API key (available free at
  [open.fda.gov/apis/authentication/](https://open.fda.gov/apis/authentication/))
  is supported for higher-volume use within the API's standard allowances.
- **Documented pagination.** The cursor-based `search_after` pagination used
  to retrieve large datasets is an officially documented openFDA API feature
  ([openFDA query parameters](https://open.fda.gov/apis/query-parameters/)),
  not a circumvention of access controls.

## Software License

The MAUDEMetrics application source code is licensed under the
**[Apache License 2.0](LICENSE)**.

This is separate from the license governing the FDA source data described above.

## No Endorsement

Use of the openFDA API does not imply endorsement by the U.S. Food and Drug
Administration or the U.S. Department of Health and Human Services.

## Disclaimer

MAUDEMetrics is intended for research and educational purposes only. It is not
intended for clinical decision-making. MAUDE data is not independently verified
by the FDA; reports may be incomplete or contain inaccuracies. See
[FDA MAUDE limitations](https://www.fda.gov/medical-devices/mandatory-reporting-requirements-manufacturers-importers-and-device-user-facilities/manufacturer-and-user-facility-device-experience-database-maude)
for further information.
