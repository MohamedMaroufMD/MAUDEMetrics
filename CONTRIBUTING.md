# Contributing to MAUDEMetrics

Thank you for your interest in contributing. All contributions are welcome — bug reports, feature suggestions, documentation improvements, and code changes.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating you agree to uphold it.

## Reporting Bugs

Open a [GitHub Issue](https://github.com/MohamedMaroufMD/MAUDEMetrics/issues) and include:
- Operating system and version (macOS, Windows, Linux)
- Python version (`python3 --version`)
- MAUDEMetrics version (shown in the About page)
- Steps to reproduce the problem
- Expected vs. actual behaviour
- Any error messages or screenshots

## Suggesting Features

Open a GitHub Issue with the label `enhancement`. Describe the use case and the proposed behaviour, and explain why the change would benefit other users.

## Development Setup

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/MAUDEMetrics.git
   cd MAUDEMetrics
   ```

2. **Create a virtual environment** and install dependencies:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate          # macOS / Linux
   .venv\Scripts\activate             # Windows
   pip install -r requirements.txt
   pip install pytest
   ```

3. **Run the application** locally:
   ```bash
   python3 app.py
   # Open http://127.0.0.1:5000 in your browser
   ```

4. **Run the test suite** to confirm everything passes before making changes:
   ```bash
   pytest
   ```

## Making Changes

- Create a feature branch from `main`:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b fix/short-description-of-bug
  ```
- Follow [PEP 8](https://peps.python.org/pep-0008/) style guidelines for Python code.
- Add or update tests in `tests/` to cover your change.
- Ensure `pytest` passes with no failures before opening a pull request.

## Pull Request Guidelines

- Keep pull requests focused on a single change.
- Write a clear description explaining *why* the change is needed.
- Reference any related issues (`Closes #123`).
- All CI checks must pass before merging.

## Running Tests

```bash
pytest              # run full suite
pytest -v           # verbose output
pytest tests/test_basic.py          # run a specific file
```

Tests are located in the `tests/` directory. New features should include corresponding tests.
