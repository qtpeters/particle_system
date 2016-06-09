#!/usr/bin/env python

from flask import Flask, request, send_from_directory

app = Flask( __name__, static_folder='website', static_url_path='' )

@app.route("/<path:path>")
def send_static( path ):
	return send_from_directory( '/', path )

if __name__ == "__main__":
	app.run()

