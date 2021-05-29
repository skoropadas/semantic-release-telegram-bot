const getConfig = require('../lib/getConfig');

describe('Test getConfig method', () => {
	it('The chat settings should override the other settings', async () => {
		const config = getConfig(
			{
				notifyOnSuccess: false,
				notifyOnFail: false,
				successMessage: 'Global Message',
				branches: [
					{
						pattern: 'test',
						notifyOnFail: true,
						successMessage: 'Branch Message',
					},
				],
				chats: [
					{
						id: 1,
						notifyOnSuccess: true,
						successMessage: 'Chat Message',
					},
				],
			},
			{branch: {name: 'test'}},
			1,
		);

		expect(config.notifyOnSuccess).toBeTruthy();
		expect(config.notifyOnFail).toBeTruthy();
		expect(config.successMessage).toBe('Chat Message');
	});

	it('The branch settings should override the global', async () => {
		const config = getConfig(
			{
				notifyOnSuccess: false,
				notifyOnFail: false,
				successMessage: 'Global Message',
				branches: [
					{
						pattern: 'test',
						notifyOnFail: true,
						successMessage: 'Branch Message',
					},
				],
			},
			{branch: {name: 'test'}},
		);

		expect(config.notifyOnSuccess).toBeFalsy();
		expect(config.notifyOnFail).toBeTruthy();
		expect(config.successMessage).toBe('Branch Message');
	});

	it('The branch settings shouldnt override the global', async () => {
		const config = getConfig(
			{
				notifyOnSuccess: false,
				notifyOnFail: false,
				successMessage: 'Global Message',
				branches: [
					{
						pattern: 'test',
						notifyOnFail: true,
						successMessage: 'Branch Message',
					},
				],
			},
			{branch: {name: '123'}},
		);

		expect(config.notifyOnSuccess).toBeFalsy();
		expect(config.notifyOnFail).toBeFalsy();
		expect(config.successMessage).toBe('Global Message');
	});
});
