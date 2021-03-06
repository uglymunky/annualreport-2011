/**
 * This is our app's build-configuration file.  It's used by r.js.
 *
 * To build:
 * > r.js -o path/to/app.build.js
 *
 * See an example here:
 * https://github.com/jrburke/r.js/blob/master/build/example.build.js
 */
({
	appDir: './public'

	// Base url to all javascript files
    , baseUrl: 'js'

	// Pointer to the runtime, main.js configuration file
	, mainConfigFile: 'public/js/main.js'

	// Where to output the build files
	, dir: './public_build'

	// This is the default, just making it explicit
	, optimize: 'uglify'

	// Inline !text files to avoid additional http requests
	, inlineText: true

	// Force ES5 mode when available
	, useStrict: true

	// Should we namespace?
	//, namespace: 'kv'

	, modules: [
		{
			name: 'main'
		}
    ]
})