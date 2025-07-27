# MAUDEMetrics - FDA Medical Device Adverse Event Explorer
# Copyright (c) 2025 Mohamed Marouf, MD
#
# This file is part of MAUDEMetrics, an open-source tool for exploring adverse event 
# reports submitted to the FDA's MAUDE database, enabling efficient safety signal 
# detection and reporting.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at:
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# For research and educational purposes only. Not for clinical decision-making.

# Use a minimal Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY app.py .
COPY templates/ ./templates/
COPY static/ ./static/

# Expose the application port
EXPOSE 5005

# Command to run the application
CMD ["python", "app.py"]
