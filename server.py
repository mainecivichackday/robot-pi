import web
from drive import drive
from scripts import scripts, script_runner
urls = (
    '/', 'index',
    '/drive', 'drive',
    '/scripts/run', 'script_runner',
    '/scripts/(.*)', 'scripts',
)
app = web.application(urls, globals())

#index raises a 301 error pointing to the index.html page
class index:
	def GET(self):
		raise web.seeother('/static/index.html')


if __name__ == "__main__":
    app.run()