import json
import pathlib

from flask import Flask, render_template

app = Flask(__name__)

base_path = pathlib.Path(__file__).parent.absolute()


@app.route('/')
def index():
	return render_template(f'index.html')


@app.route('/backup.json')
def backup():
	with open(f'{base_path}/data/backup.json', "r") as f:
		return json.load(f)


if __name__ == "__main__":
	app.run()
