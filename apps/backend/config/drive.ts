/**
 * Config source: https://git.io/JBt3o
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { driveConfig } from '@adonisjs/core/build/config'

/*
|--------------------------------------------------------------------------
| Drive Config
|--------------------------------------------------------------------------
|
| The `DriveConfig` relies on the `DisksList` interface which is
| defined inside the `contracts` directory.
|
*/
export default driveConfig({
	/*
	|--------------------------------------------------------------------------
	| Default disk
	|--------------------------------------------------------------------------
	|
	| The default disk to use for managing file uploads. The value is driven by
	| the `DRIVE_DISK` environment variable.
	|
	*/
	disk: Env.get('DRIVE_DISK'),

	disks: {
		local: {
			driver: 'local',
			visibility: 'public',
			root: Env.get('CDN_MOUNT'),
			serveFiles: true,
			basePath: '/images',
		},
	},
})
