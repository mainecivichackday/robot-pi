import errors
import web

class drive:
	def GET(self):
		print "VROOOOM!"
		raise errors.NotSupportedError
		return "This should return a 405 - Not Supported Error"
	
	#POST excepts a single command in plain teext.
	#Current supported commands: forward', 'reverse', 'left', 'right', 'auto', 'stop'
	def POST(self):
		direction = web.data()
		if direction not in ['forward', 'reverse', 'left', 'right', 'auto', 'stop']:
			raise errors.BadRequestError

		#Set robot direction here...


		return "Updated direction"