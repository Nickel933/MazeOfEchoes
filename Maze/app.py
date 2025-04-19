from flask import Flask, render_template, jsonify, request
from flask_mysqldb import MySQL
import random
from maze_generator import generate_maze

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_mysql_user'
app.config['MYSQL_PASSWORD'] = 'your_mysql_password'
app.config['MYSQL_DB'] = 'maze_game'
mysql = MySQL(app)

maze = generate_maze()

@app.route('/')
def index():
    return render_template('index.html', maze=maze)

@app.route('/get_question', methods=['GET'])
def get_question():
    category = random.choice(['Math', 'GK'])
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM questions WHERE category=%s ORDER BY RAND() LIMIT 1", (category,))
    row = cur.fetchone()
    cur.close()
    if row:
        return jsonify({
            'id': row[0],
            'category': row[1],
            'question': row[2],
            'options': {
                'A': row[3],
                'B': row[4],
                'C': row[5],
                'D': row[6],
            },
            'correct': row[7]
        })
    return jsonify({'error': 'No questions found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
