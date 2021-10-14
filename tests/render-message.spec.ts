import {renderMessage} from '../src/common/render-message';
import {TGBotRenderedMessage} from '../src/interfaces/rendered-message';

describe('Render message', () => {
	describe('Markdown', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({message: '**Title**\nContent'});

			expect(renderedMessage.message).toBe('*Title*\nContent');
			expect(renderedMessage.format).toBe('markdown');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({message: '**${title}**\n${content}'}, {title: 'Title', content: 'Content'});

			expect(renderedMessage.message).toBe('*Title*\nContent');
			expect(renderedMessage.format).toBe('markdown');
		});
	})

	describe('HTML', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({message: '<b>Title</b>\nContent', format: 'html'});

			expect(renderedMessage.message).toBe('<b>Title</b>\nContent');
			expect(renderedMessage.format).toBe('html');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({message: '<b>${title}</b>\n${content}', format: 'html'}, {title: 'Title', content: 'Content'});

			expect(renderedMessage.message).toBe('<b>Title</b>\nContent');
			expect(renderedMessage.format).toBe('html');
		});
	})
});

describe('Render template message', () => {
	describe('Markdown', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({path: './tests/common/message.md'});

			expect(renderedMessage.message.replace(/\s+/g, "")).toBe('_Title_Content');
			expect(renderedMessage.format).toBe('markdown');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({path: './tests/common/message-context.md'}, {title: 'Title', content: 'Content'});

			expect(renderedMessage.message.replace(/\s+/g, "")).toBe('_Title_Content');
			expect(renderedMessage.format).toBe('markdown');
		});
	})

	describe('HTML', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({path: './tests/common/message.html'});

			expect(renderedMessage.message.replace(/\s+/g, "")).toBe('<b>Title</b>Content');
			expect(renderedMessage.format).toBe('html');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({path: './tests/common/message-context.html'}, {title: 'Title', content: 'Content'});

			expect(renderedMessage.message.replace(/\s+/g, "")).toBe('<b>Title</b>Content');
			expect(renderedMessage.format).toBe('html');
		});
	})
});
