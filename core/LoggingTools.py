import json


class LoggingController:

	def __init__(self, backup_path: str):
		self.BACKUP_FILE = backup_path

	def add_event(self, event_id: str, event_data: dict) -> bool:
		"""
		Add an event to the backup file.
		"""
		with open(self.BACKUP_FILE, 'r') as f:
			backup = json.load(f)
		backup[event_id] = event_data
		with open(self.BACKUP_FILE, 'w') as f:
			json.dump(backup, f, indent=4, default=str)

		return True

	def update_event(self, event_id: str, key: str, value: str) -> bool:
		"""
		Modify a value in the backup file.
		"""
		with open(self.BACKUP_FILE, 'r') as f:
			backup = json.load(f)
		backup[event_id][key] = value
		with open(self.BACKUP_FILE, 'w') as f:
			json.dump(backup, f, indent=4, default=str)

		return True

	def get_event(self, event_id: str) -> dict:
		"""
		Get an event from the backup file.
		"""
		with open(self.BACKUP_FILE, 'r') as f:
			backup = json.load(f)
		return backup[event_id]

	def remove_event(self, event_id: str) -> bool:
		"""
		Remove an event from the backup file.
		"""
		with open(self.BACKUP_FILE, 'r') as f:
			backup = json.load(f)
		del backup[event_id]
		with open(self.BACKUP_FILE, 'w') as f:
			json.dump(backup, f, indent=4)

		return True

	def clear_history(self) -> bool:
		"""
		Clear the backup file.
		"""
		with open(self.BACKUP_FILE, 'w') as f:
			json.dump({}, f)

		return True
