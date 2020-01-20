import { MessageService } from "./message.service";

describe("MessageService", () => {
    let service: MessageService;

    it("Should have no messages to start", () => {
        service = new MessageService();
        expect(service.messages.length).toBe(0);
    });

    it("Should add a message when add is called", () => {
        service = new MessageService();
        service.add("Message1");
        expect(service.messages.length).toBe(1);
    });

    it("Should remove all messages when clear is called", () => {
        service = new MessageService();
        service.add("Message1");
        service.clear();
        expect(service.messages.length).toBe(0);
    });
});
