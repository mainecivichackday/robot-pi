import web
import errors

from os import listdir
from os.path import isfile, join
import json

user_scripts_path = './user_scripts/'

#scripts manages the scripts on the server.
class scripts:
	def GET(self, script_name=None):
		print "script_name: %s" % len(script_name)
		#If no script_id is present, return a list of scripts
		if script_name is None or len(script_name) == 0:
			scripts = [f for f in listdir(user_scripts_path) if isfile(join(user_scripts_path, f))]
			web.header('Content-Type', 'application/json')
			return json.dumps(scripts)
		
		#Return content of script
		script_path = join(user_scripts_path, script_name)
		if not isfile(script_path):
			raise errors.BadRequestError
		f = open(script_path, 'r')
		return f.read()


	#POST updates the specified script. If no script is specified while POSTing, a 405 is returned
	def POST(self, script_name=None):
		print "POSTing to %s"%script_name
		#Verify a script was specified
		if script_name is None or len(script_name) == 0:
			raise errors.NotSupportedError

		#Read the script data from the POST field
		script_text = web.data()

		#If there is no content, return 400
		if len(script_text) == 0:
			raise errors.BadRequestError

		script_path = join(user_scripts_path, script_name)
		f = open(script_path, 'w')
		f.write(script_text)
		return "Script saved successfully."

class script_runner:
	def POST(self):
		print "POSTing to /scripts/run"

		script_name = web.data()

		#Return content of script
		script_path = join(user_scripts_path, script_name)
		if not isfile(script_path):
			raise errors.BadRequestError
		f = open(script_path, 'r')
		
		script = f.read()
		try:
			exec(script)
		except:
			return "Script failed to execute without errors"

		return "I have executed the requested script without error"
		#exec(f.read())	
		#Reads script name and executes the script