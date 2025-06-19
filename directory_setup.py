import os

# Create necessary directories
directories = [
    "templates",
    "static/css",
    "static/js",
    "static/images"
]

for directory in directories:
    os.makedirs(directory, exist_ok=True)
    print(f"Created directory: {directory}")

print("Directory structure set up successfully!")
