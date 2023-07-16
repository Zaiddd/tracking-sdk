import {mount} from "@vue/test-utils";
import LoginView from "../../src/views/LoginView.vue";
const wrapper = mount(LoginView);

describe("LoginView", () => {
    it("should check for a form element", () => {
        const formElement = wrapper.find("form");
        expect(formElement.exists()).toBe(true);
    });

    it("should check for email and password inputs", () => {
        const emailInput = wrapper.find("#email");
        const passwordInput = wrapper.find("#password");
        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
    });
});