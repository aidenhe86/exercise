describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
        submitPaymentInfo();
    });

    it(`should sum total amount properly on sumPaymentTotal(type)`,function(){
        expect(sumPaymentTotal(`billAmt`)).toEqual(100);
        expect(sumPaymentTotal(`tipAmt`)).toEqual(10);
        expect(sumPaymentTotal(`tipPercent`)).toEqual(10);

        billAmtInput.value = 200;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        expect(sumPaymentTotal(`billAmt`)).toEqual(300);
        expect(sumPaymentTotal(`tipAmt`)).toEqual(30);
        expect(sumPaymentTotal(`tipPercent`)).toEqual(20);
    });

    it(`should return tip percent properly on calculateTipPercent()`,function(){
        expect(calculateTipPercent(100, 20)).toEqual(20);
        expect(calculateTipPercent(`test`, 20)).toEqual(NaN);
        expect(calculateTipPercent(1000, 111)).toEqual(11);
    });

    it(`should append new td to given tr on appendTd(tr, value)`,function(){
        let newTr = document.createElement(`tr`);
        appendTd(newTr,`test`);
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual(`test`);
    });

    it(`should append delete tr on given td on appendDeleteBtn(tr)`,function(){
        let newTr = document.createElement(`tr`);
        appendDeleteBtn(newTr);
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual(`X`);
    });

    afterEach(function() {
        billAmtInput.value = ``;
        tipAmtInput.value = ``;
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = ``;
        summaryTds[0].innerHTML = ``;
        summaryTds[1].innerHTML = ``;
        summaryTds[2].innerHTML = ``;
        serverTbody.innerHTML = '';
    });
});