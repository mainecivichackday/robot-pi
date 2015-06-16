import errors
import web

try:
	import controller.robot as r
except ImportError: #Unable to load controller.robot on a desktop development environment
	import controller.robot_dummy as r


#The drive class handles requests to the /drive URL. It accepts a POST request containing
#the direction of travel. 
class drive:
	def GET(self):
		raise errors.NotSupportedError

	
	#POST excepts a single command in plain teext.
	#Current supported commands: forward', 'reverse', 'left', 'right', 'stop'
	#TODO: Support 'auto'
	def POST(self):
		direction = web.data()
		if direction not in ['forward', 'reverse', 'left', 'right', 'stop']: #'auto',
			raise errors.BadRequestError

		#Set robot direction here...
		r.move(direction)

		return "Updated direction"
