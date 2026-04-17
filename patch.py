import glob, re
import sys

for f in glob.glob('src/pages/*.jsx'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if file has sbmsData
    if '../data/sbmsData' not in content: continue

    # Extract the imported variables
    match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'\"]../data/sbmsData[\'\"];', content)
    if match:
        vars_str = match.group(1).strip()
        
        # Replace the import
        content = content.replace(match.group(0), 'import { useData } from "../context/DataContext";')
        
        # Find the React component definition (function ComponentName() {) 
        # and insert the useData extraction right after the opening brace
        content = re.sub(
            r'(export default function \w+\([^)]*\)\s*\{)',
            r'\1\n  const { ' + vars_str + r' } = useData();',
            content
        )
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
