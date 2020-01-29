import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";
import { HeroComponent } from "../hero/hero.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { Component, Input, Output, NO_ERRORS_SCHEMA } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe("HeroesComponent (Deep tests)", () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

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
            declarations: [HeroesComponent, HeroComponent],
            providers: [{ provide: HeroService, useValue: mockHeroService }],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('Should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        // run ngOnInit:
        fixture.detectChanges();

        let heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i])
        }
    });

    it(`should call heroService.deleteHero when the Hero component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete'); // find  delete method and watch if its invoked

        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        // run ngOnInit:
        fixture.detectChanges();

        // dig down to child
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined); // telling the child to raise event

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })
});