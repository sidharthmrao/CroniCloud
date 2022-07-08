import argparse
import random
import subprocess
import sys
from datetime import datetime
import pathlib

from LoggingTools import LoggingController

base_path = pathlib.Path(__file__).parent.parent.absolute()
backup_file = f'{base_path}/data/backup.json'
json_controller = LoggingController(backup_file)

parser = argparse.ArgumentParser(description='Track cron commands.')
parser.add_argument('-d', '--destroy', action='store_true', help='Clear the backup file.')
parser.add_argument('-e', '--exec', help='Execute a file.')
parser.add_argument('-n', '--name', help='Name of the cron command.')
parser.add_argument('-c', '--category', help='Define the category for the command.')
parser.add_argument('-de', '--description', help='Define the description for the command.')

if len(sys.argv) == 1:
	parser.print_help(sys.stderr)
	sys.exit(1)

args = parser.parse_args()

if args.destroy:
	json_controller.clear_history()
	print('Backup file cleared.')
	exit(0)

elif args.exec:
	hash_id = "%032x" % random.getrandbits(128)
	name = args.name if args.name else hash_id
	category = args.category if args.category else 'default'
	description = args.description if args.description else 'No description.'
	json_controller.add_event(hash_id, {"Category": category, "Description": description, "Name": name,
	                                    "TimeStamp": datetime.now(), "Status": "Running..."})

	try:
		subprocess.check_call(args.exec, shell=True)
		json_controller.update_event(hash_id, "Status", "Success")

	except subprocess.CalledProcessError:
		json_controller.update_event(hash_id, "Status", "Failed")
