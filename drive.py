import errors
import web
import robot as r

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
