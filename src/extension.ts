// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Position } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "log-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('log-helper.add', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Add logs from Log-Helper!');

		const settings = {
			uri: vscode.Uri.file('E:\\Project\\log-helper\\test.js'),
			logs: "console.log('This is inserted by log-helper');\n"
		};
		vscode.workspace.openTextDocument(settings.uri).then((doc: vscode.TextDocument) => {
			vscode.window.showTextDocument(doc, 1, false).then(e => {
				e.edit(edit => {
					edit.insert(new Position(0, 0), settings.logs);;
				}).then(() => {
					doc.save();
				});
			});
		}, (error: any) => {
			vscode.window.showErrorMessage('Error when openning document: ' + settings.uri.toString() + ': ' + error);
		});

		// const activeEditor = vscode.window.activeTextEditor;
		// if (activeEditor) {
		// 	//const document = activeEditor.document;
		// 	//const selection = activeEditor.selection;
		// 	const position = new Position(0, 0);

		// 	// Get the word within the selection
		// 	// const word = document.getText(selection);

		// 	activeEditor.edit(builder => {
		// 		// vscode.window.showInformationMessage('Added logs to current open document!');
		// 		builder.insert(position, 'console.log("This is inserted by log-helper")');
		// 	})
		// }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
