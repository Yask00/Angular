import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], // mock http module
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });

    describe('getHero', () => {
        it('should call get with the correct url',
            () => {
                // inject([HeroService, HttpTestingController],
                //     (service: HeroService, controller: HttpTestingController) => {
                //         service.getHero(4).subscribe();
                //     })

                service.getHero(4).subscribe(() => {
                    console.log('fullfield '); // executes after the flush
                });

                const req = httpTestingController.expectOne('api/heroes/4');
                req.flush({ id: 4, name: 'SuperDude', strength: 100 }); // tell what to send back
            });
    });
})