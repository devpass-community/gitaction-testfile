const core = require('@actions/core');

try {
  const myInput = core.getInput('myInput');
  switch (myInput) {
      case 'Date+Extensions.swift':
        myOutput = 'GitHubAppTests/DateExtensionsTests';
        break;
  };
  core.setOutput('myOutput', myOutput);
} catch (error) {
  core.setFailed(error.message);
}
