import { HomePage } from "../pages/home.po";
import {browser} from 'protractor';
import { LoginPage } from "../pages/login.po";
import { StationBikesPage } from "../pages/station-bikes.po";
import { NewMalfunctionPage } from "../pages/new-malfunction.po";
import { MalfunctionsPage } from "../pages/malfunctions.po";
import { ReturnBikePage } from "../pages/return-bike.po";

describe('editing malfunction state', ()=>{
    const homePage = new HomePage;
    const malfunctionPage = new MalfunctionsPage();
    beforeEach(async ()=>{
        // delete all malfunctions
        await malfunctionPage.navigateToMalfunctions();
        let malfunctions = await malfunctionPage.getMalfunctions();
        while(malfunctions.length){
            await malfunctions[0].click();
            await (await malfunctionPage.getMalfunctionButtons(malfunctions[0]))[0].click();
            malfunctions = await malfunctionPage.getMalfunctions();
        }
        // add one malfunction
        await homePage.navigateToHome();
        
        if (await browser.getCurrentUrl() !== `${browser.baseUrl}login`) {
            await homePage.getLogoutButton().click();
        }
        await (new LoginPage()).preformTechLogin();

        expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
        const stations = await homePage.getBikeStations();
        expect(await homePage.getBikeStationAvailableBikesCount(stations[0])).toBeGreaterThanOrEqual(2);
        await stations[0].click();
        
        expect(await browser.getCurrentUrl()).toContain('/station/');
        const stationBikesPage = new StationBikesPage();
        const bikes = await stationBikesPage.getStationBikes();
        await bikes[0].click();
        await stationBikesPage.getBikeRentButton(bikes[0]).click();

        expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
        const rentedBikes = await homePage.getRentedBikes();
        expect(rentedBikes.length).toEqual(1);
        await rentedBikes[0].click();
        await homePage.getRentedBikeMalfunctionButton(rentedBikes[0]).click();

        expect(await browser.getCurrentUrl()).toContain('/new-malfunction/');
        const newMalfunctionPage = new NewMalfunctionPage();
        await newMalfunctionPage.getDescriptionTextbox().sendKeys('description');
        await newMalfunctionPage.getReportButton().click();

    });

    it('tests should be initialized correctly', async ()=>{
        expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
        await malfunctionPage.navigateToMalfunctions();
        expect((await malfunctionPage.getMalfunctions()).length).toEqual(1);
    });

    it('should not allow to accept malfunction if bike is rented', async ()=>{
        await malfunctionPage.navigateToMalfunctions();
        expect(await browser.getCurrentUrl()).toContain('/malfunctions');
        const malfunction = (await malfunctionPage.getMalfunctions())[0];
        await malfunction.click();
        expect((await malfunctionPage.getMalfunctionButtons(malfunction)).length).toEqual(0);
    });

    it('should accept malfunction and repair bike', async ()=>{
        const bike = (await homePage.getRentedBikes())[0];
        await bike.click();
        await homePage.getRentedBikeReturnButton(bike).click();
        
        expect(await browser.getCurrentUrl()).toContain('/return/');
        await (await (new ReturnBikePage()).getBikeStations())[0].click();

        await malfunctionPage.navigateToMalfunctions();
        expect(await browser.getCurrentUrl()).toContain('/malfunctions');

        let malfunction = (await malfunctionPage.getMalfunctions())[0];
        await malfunction.click();
        expect((await malfunctionPage.getMalfunctionButtons(malfunction)).length).toEqual(2);
        await malfunctionPage.getMalfunctionAcceptButton(malfunction).click();

        malfunction = (await malfunctionPage.getMalfunctions())[0];
        await malfunction.click();
        expect((await malfunctionPage.getMalfunctionButtons(malfunction)).length).toEqual(1);
        await malfunctionPage.getMalfunctionRepairButton(malfunction).click();
        
        expect((await malfunctionPage.getMalfunctions()).length).toEqual(0);
    });

    it('should allow to cancel malfunction if bike is not rented', async ()=>{
        const bike = (await homePage.getRentedBikes())[0];
        await bike.click();
        await homePage.getRentedBikeReturnButton(bike).click();
        
        expect(await browser.getCurrentUrl()).toContain('/return/');
        await (await (new ReturnBikePage()).getBikeStations())[0].click();

        await malfunctionPage.navigateToMalfunctions();
        expect(await browser.getCurrentUrl()).toContain('/malfunctions');

        const malfunction = (await malfunctionPage.getMalfunctions())[0];
        await malfunction.click();
        expect((await malfunctionPage.getMalfunctionButtons(malfunction)).length).toEqual(2);
        await malfunctionPage.getMalfunctionCancelButton(malfunction).click();

        expect((await malfunctionPage.getMalfunctions()).length).toEqual(0);
    });

    afterEach(async ()=>{
        // return bike 
        await homePage.navigateToHome();
        const bikes = await homePage.getRentedBikes();
        if(bikes.length){
            await bikes[0].click();
            await homePage.getRentedBikeReturnButton(bikes[0]).click();
            expect(await browser.getCurrentUrl()).toContain('/return/');

            await (await (new ReturnBikePage()).getBikeStations())[0].click();
        }
        // delete all malfunctions
        await malfunctionPage.navigateToMalfunctions();
        let malfunctions = await malfunctionPage.getMalfunctions();
        while(malfunctions.length){
            await malfunctions[0].click();
            await (await malfunctionPage.getMalfunctionButtons(malfunctions[0]))[0].click();
            malfunctions = await malfunctionPage.getMalfunctions();
        }
    })
});