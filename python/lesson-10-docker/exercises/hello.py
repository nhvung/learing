import os
import sys

env = os.getenv("ENVIRONMENT", "unknown")
print(f"Hello from Docker!")
print(f"Python {sys.version}")
print(f"Environment: {env}")
