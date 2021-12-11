describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
    });

    //test submitPaymentInfo() will also test updateSummary()
    it(`should add a new payment to allPayments on submitPaymentInfo()`,function(){
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('10');
        expect(allPayments['payment1'].tipPercent).toEqual(10);
    })

    it(`should create a new payment on createCurPayment()`,function(){
        let expectPayment = {billAmt : `100` , tipAmt: `10` , tipPercent:10};
        expect(createCurPayment()).toEqual(expectPayment);
    });

    it(`should append properly to PaymentTable on appendPaymentTable()`,function(){
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;
        appendPaymentTable(curPayment);

        let curTdList = document.querySelectorAll(`#paymentTable tbody tr td`);
        expect(curTdList[0].innerText).toEqual(`$100`);
        expect(curTdList[1].innerText).toEqual(`$10`);
        expect(curTdList[2].innerText).toEqual(`10%`);
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
    });
})