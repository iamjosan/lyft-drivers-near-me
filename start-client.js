require('fix-path')();
require('child_process')
	.spawn('npm', ['start'], {
			stdio: 'inherit',
			cwd: 'client',
			shell: true
	});