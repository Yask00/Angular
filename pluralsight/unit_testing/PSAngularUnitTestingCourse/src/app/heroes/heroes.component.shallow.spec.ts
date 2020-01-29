import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";
import { HeroComponent } from "../hero/hero.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { Component, Input, Output } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe("HeroesComponent", () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: "SpiderDude", strength: 8 },
            { id: 2, name: "Wonderful Woman", strength: 24 },
            { id: 3, name: "SuperDude", strength: 55 }
        ];

        mockHeroService = jasmine.createSpyObj([
            "getHeroes",
            "addHero",
            "deleteHero"
        ]);

        component = new HeroesComponent(mockHeroService);
    });

    describe("Delete", () => {
        it("should remove the indicated hero from the heroes list", () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        });

        it("should call deleteHero service method", () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalled();
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});

describe("HeroesComponent (Shallow tests)", () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: "app-hero",
        template: "<div></div>"
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
    }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: "SpiderDude", strength: 8 },
            { id: 2, name: "Wonderful Woman", strength: 24 },
            { id: 3, name: "SuperDude", strength: 55 }
        ];
        mockHeroService = jasmine.createSpyObj([
            "getHeroes",
            "addHero",
            "deleteHero"
        ]);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [{ provide: HeroService, useValue: mockHeroService }]
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it("should set heroes correctly from the service", () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it("should create one <li> for every hero", () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
    });
});
