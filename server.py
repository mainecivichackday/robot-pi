import web
from drive import drive

urls = (
    '/', 'index',
    '/drive', 'drive',
)
app = web.application(urls, globals())

#index raises a 301 error pointing to the index.html page
class index:
	def GET(self):
		raise web.seeother('/static/index.html')

#405 error when incorrect action is used on a resource
class NotSupportedError(web.HTTPError):
	def __init__(self):
		status = '405 Method Not Alloweds'
		headers = {'Content-Type': 'text/html'}
		data = 'That method is not valid for this action.'
		web.HTTPError.__init__(self, status, headers, data)

#400 error when invalid data is sent to a resource
class BadRequestError(web.HTTPError):
	def __init__(self):
		status = '400'
		headers = {'Content-Type': 'text/html'}
		data = 'Invalid data supplied in request.'
		web.HTTPError.__init__(self, status, headers, data)



if __name__ == "__main__":
    app.run()