import errors
import web
try:
	import controller.robot as r
except ImportError:
	import controller.robot_dummy as r

#drive class  accepts a POST command with the direction of travel
class drive:
	def GET(self):
		raise errors.NotSupportedError

	
	#POST excepts a single command in plain teext.
	#Current supported commands: forward', 'reverse', 'left', 'right', 'auto', 'stop'
	def POST(self):
		direction = web.data()
		if direction not in ['forward', 'reverse', 'left', 'right', 'auto', 'stop']:
			raise errors.BadRequestError

		#Set robot direction here...
                if direction == 'forward':
                    r.forward(1)
                if direction == 'reverse':
                    r.reverse(1)
                if direction == 'left':
                    r.left(0.5)
                if direction == 'right':
                    r.right(0.5)
                if direction == 'stop':
                    r.stop()
		return "Updated direction"
