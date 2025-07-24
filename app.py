import os
import csv
from pytz import timezone
from datetime import datetime
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# Path to the CSV file
CSV_FILE = 'email_address.csv'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit-email', methods=['POST'])
def submit_email():
    # Get email from form
    email = request.form.get('email')
    
    if email:
        # Check if email already exists in CSV
        email_exists = False
        if os.path.isfile(CSV_FILE):
            with open(CSV_FILE, 'r', newline='') as csvfile:
                reader = csv.reader(csvfile)
                next(reader, None) # Skip header if exists
                for row in reader:
                    if row and row[0] == email:
                        email_exists = True
                        break
        
        if email_exists:
            # Email already registered
            return jsonify({'status': 'error', 'message': 'This email address has already been registered.'})
        else:
            # Store new email with timestamp in HKT
            timestamp = datetime.now(timezone('Asia/Hong_Kong')).strftime('%Y-%m-%d %H:%M:%S')
            file_exists = os.path.isfile(CSV_FILE)

            with open(CSV_FILE, 'a', newline='') as csvfile:
                writer = csv.writer(csvfile)
                if not file_exists:
                    writer.writerow(['Email', 'Submission Time']) # Write header if file is new
                writer.writerow([email, timestamp])
            return jsonify({'status': 'success', 'message': 'Email address successfully submitted!'})
    
    return jsonify({'status': 'error', 'message': 'Invalid email address.'})

if __name__ == '__main__':
    app.run(debug=True)