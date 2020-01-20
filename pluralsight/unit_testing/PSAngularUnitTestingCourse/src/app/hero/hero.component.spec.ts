import { HeroComponent } from "./hero.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent (shallow tests)", () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            // tell the test to ignore unknown attributes and elements
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it("Should have the correct hero", () => {
        fixture.componentInstance.hero = {
            id: 1,
            name: "SuperDude",
            strength: 3
        };

        expect(fixture.componentInstance.hero.name).toEqual("SuperDude");
    });

    it("should render the hero name in an anchor tag w nativeElement", () => {
        fixture.componentInstance.hero = {
            id: 1,
            name: "SuperDude",
            strength: 3
        };
        // Test if the name of the hero shows inside of an anchor tag
        // To do that we need change detection to occur, because starting value will be ''
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector("a").textContent).toContain(
            "SuperDude"
        );
    });

    it("should render the hero name in an anchor tag w debugElement", () => {
        fixture.componentInstance.hero = {
            id: 1,
            name: "SuperDude",
            strength: 3
        };
        // Test if the name of the hero shows inside of an anchor tag
        // To do that we need change detection to occur, because starting value will be ''
        fixture.detectChanges();

        let de = fixture.debugElement.query(By.css("a"));
        expect(de.nativeElement.textContent).toContain("SuperDude");
    });
});
