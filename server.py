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


if __name__ == "__main__":
    app.run()