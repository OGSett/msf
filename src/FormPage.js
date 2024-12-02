import { useState, useRef, useEffect } from "react";
import Switch from "@mui/material/Switch";

const FromPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flag, setFlag] = useState(0);
    const [test, setTest] = useState(1); // 1 = Monthly, 2 = Yearly
    const [price, setPrice] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [monthlyOrYearly, setMonthlyOrYearly] = useState("Monthly");
    const [paymentMode, setPaymentMode] = useState("per month");
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);

    const [selectAddsOn, setSelectedAddsOn] = useState({
        onlineService: false,
        storage: false,
        customProfile: false,
    });


    const planPrice = ({
        arcade: 9,
        advanced: 12,
        pro: 15,
        onlineService: 1,
        storage: 2,
        customProfile: 2,
        blArcade: "/mo",
        blAdvanced: "/mo",
        blPro: "/mo",
    });
    const [planPriceIs, setPlanPriceIs] = useState({
        arcade: 9,
        advanced: 12,
        pro: 15,
        onlineService: 1,
        storage: 2,
        customProfile: 2,
        blArcade: "/mo",
        blAdvanced: "/mo",
        blPro: "/mo",
    });

    const handleAddsChange = (event) => {
        const { name, checked } = event.target;
        setSelectedAddsOn((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleTest = () => {
        setTest((prevTest) => {
            const newTest = prevTest === 1 ? 2 : 1;
            setMonthlyOrYearly(newTest === 1 ? "Monthly" : "Yearly");
            setPaymentMode(newTest === 1 ? "per month" : "per year");
            recalculatePrice(newTest, selectedPlan, selectAddsOn);
            return newTest;
        });
    };

    const recalculatePrice = (billingType, selectedPlan, addons) => {
        let newPrice = 0;

        // Base plan price adjustment
        if (selectedPlan) {
            const basePrice = planPrice[selectedPlan.toLowerCase()];
            newPrice += billingType === 1 ? basePrice : basePrice * 10;
        }

        // Add-ons adjustment
        if (addons.onlineService) {
            newPrice += billingType === 1 ? planPrice.onlineService : planPrice.onlineService * 10;
        }
        if (addons.storage) {
            newPrice += billingType === 1 ? planPrice.storage : planPrice.storage * 10;
        }
        if (addons.customProfile) {
            newPrice += billingType === 1 ? planPrice.customProfile : planPrice.customProfile * 10;
        }

        setPrice(newPrice);
    };

    const handleSelectedPlan = (planPriceValue, selectedPlanName) => {
        setSelectedPlan(selectedPlanName);
        recalculatePrice(test, selectedPlanName, selectAddsOn);
    };

    const handleNextToBl = () => {
        recalculatePrice(test, selectedPlan, selectAddsOn);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        if (test === 1) {
            setPlanPriceIs({
                arcade: 9,
                advanced: 12,
                pro: 15,
                onlineService: 1,
                storage: 2,
                customProfile: 2,
                blArcade: "/mo",
                blAdvanced: "/mo",
                blPro: "/mo",
            })
        } else if (test === 2) {
            setPlanPriceIs({
                arcade: 90,
                advanced: 120,
                pro: 150,
                onlineService: 10,
                storage: 20,
                customProfile: 20,
                blArcade: "/yr",
                blAdvanced: "/yr",
                blPro: "/yr",
            })
        }
    }, [test])

    const handleFromInfoToPlan = () => {
        const nameValue = nameRef.current.value
        const emailValue = emailRef.current.value
        const phoneValue = phoneRef.current.value
        if (!nameValue || !emailValue || !phoneValue) {
            if (!nameValue) {
                setFlag(1)
            }
            if (!emailValue) {
                setFlag(2)
            }
            if (!phoneValue || !phoneValue.isInteger()) {
                setFlag(3)
            }
            if (!nameValue && !emailValue && !phoneValue) {
                setFlag(4)
            }
            return
        }
        setFlag(0)
        setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    const handleFromPlanToAdds = () => {
        if(selectedPlan === '') {
            window.alert("Please select a plan before proceeding")
            return
        }
        setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    const handleMultiNext = () => {
        if (currentIndex === 0) {
            handleFromInfoToPlan()
        }
        if (currentIndex === 1) {
            handleFromPlanToAdds()
        }
        if (currentIndex === 2) {
            handleNextToBl()
        }
        if (currentIndex === 3) {
            handleConfirmOrder()
        }
    }

    const handleConfirmOrder = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    const InfoChart = () => {
        return (
            <div className="infoWrapper">
                <h2>Personal info</h2>
                <p>Please provide your name, email address, and phone number.</p>
                <div className="labelHolder">
                    <label htmlFor="name">Name</label>
                    <label htmlFor="name" className={ (flag === 1 || flag === 4) ? 'errorMsg' : 'hide'}>This field is required</label>
                </div>
                <input type="text" id="name" ref={nameRef} placeholder="e.g. Stephen king" className={ (flag === 1 || flag === 4) ? 'errorInput' : 'infoWrapperInput'}/>
                <div className="labelHolder">
                    <label htmlFor="email">Email Address</label>
                    <label htmlFor="email" className={ (flag === 2 || flag === 4) ? 'errorMsg' : 'hide'}>This field is required</label>
                </div>
                <input type="email" id="email" ref={emailRef} placeholder="e.g. stephenking@lorem.com" className={ (flag === 2 || flag === 4) ? 'errorInput' : 'infoWrapperInput'}/>
                <div className="labelHolder">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <label htmlFor="phoneNumber" className={ (flag === 3 || flag === 4) ? 'errorMsg' : 'hide'}>This field is required</label>
                </div>
                <input type="tel" id="phoneNumber" ref={phoneRef} placeholder="e.g. +1 234 567 890" className={ (flag === 3 || flag === 4) ? 'errorInput' : 'infoWrapperInput'}/>
                <button onClick={handleFromInfoToPlan} className="btnNxtFrmInfo  hideForMobile">
                    Next Step
                </button>
            </div>
        );
    };

    const PlanChart = () => {
        return (
            <div className="planWrapper">
                <h2>Select your plan</h2>
                <p>You have the option of monthly or yearly billing</p>
                <div className="offers">
                    <div
                        className={selectedPlan === "Arcade" ? "offerCard check" : "offerCard"}
                        onClick={() => handleSelectedPlan(planPrice.arcade, "Arcade")}
                    >
                        <img src="./images/icon-arcade.svg" alt="/" />
                        <div className="test2">
                            <span className="planName">Arcade</span>
                            <span className="priceIs">${planPriceIs.arcade}{planPriceIs.blArcade}</span>
                            <span className={(test === 2) ? 'freeMonths' : 'hide'}>2 free months</span>
                        </div>
                    </div>
                    <div
                        className={selectedPlan === "Advanced" ? "offerCard check" : "offerCard"}
                        onClick={() => handleSelectedPlan(planPrice.advanced, "Advanced")}
                    >
                        <img src="./images/icon-advanced.svg" alt="/" />
                        <div className="test2">
                            <span className="planName">Advanced</span>
                            <span className="priceIs">${planPriceIs.advanced}{planPriceIs.blAdvanced}</span>
                            <span className={(test === 2) ? 'freeMonths' : 'hide'}>2 free months</span>
                        </div>
                    </div>
                    <div
                        className={selectedPlan === "Pro" ? "offerCard check" : "offerCard"}
                        onClick={() => handleSelectedPlan(planPrice.pro, "Pro")}
                    >
                        <img src="./images/icon-pro.svg" alt="/" />
                        <div className="test2">
                            <span className="planName">Pro</span>
                            <span className="priceIs">${planPriceIs.pro}{planPriceIs.blPro}</span>
                            <span className={(test === 2) ? 'freeMonths' : 'hide'}>2 free months</span>
                        </div>
                    </div>
                </div>
                <div className="billingSelect">
                    <span>Monthly</span>
                    <Switch
                        checked={test === 2}
                        onChange={handleTest}
                        inputProps={{
                            "aria-checked": test === 2,
                        }}
                    />
                    <span>Yearly</span>
                </div>
                <div className="btnWrapper hideForMobile">
                    <button className="btn2" onClick={handlePrev}>Go Back</button>
                    <button className="btn1" onClick={handleFromPlanToAdds}>Next Step</button>
                </div>
            </div>
        );
    };

    const AddsChart = () => {
        return (
            <div className="addsWrapper">
                <h1>Pick Adds-ons</h1>
                <p>Add-ons help enhance your experience.</p>
                <div className="offerHolder">
                    <div className={selectAddsOn.onlineService ? 'offerChecked' : 'offer'}>
                        <div className="offerInfo">
                            <div className="radios">
                                <input
                                    type="checkbox"
                                    name="onlineService"
                                    checked={selectAddsOn.onlineService}
                                    onChange={handleAddsChange}
                                    className="dd"
                                />
                            </div>
                            <div className="infos">
                                <h3>Online service</h3>
                                <p>Access to multiplayer games</p>
                            </div>
                        </div>
                        <div className="offerPrice">
                            <span>+${planPriceIs.onlineService}{planPriceIs.blAdvanced}</span>
                        </div>
                    </div>
                    <div className={selectAddsOn.storage ? 'offerChecked' : 'offer'}>
                        <div className="offerInfo">
                            <div className="radios">
                                <input 
                                    type="checkbox"
                                    name="storage"
                                    checked={selectAddsOn.storage}
                                    onChange={handleAddsChange}/>
                            </div>
                            <div className="infos">
                                <h3>Larger storage</h3>
                                <p>Extra 1TB of cloud save</p>
                            </div>
                        </div>
                        <div className="offerPrice">
                            <span>+${planPriceIs.storage}{planPriceIs.blAdvanced}</span>
                        </div>
                    </div>
                    <div className={selectAddsOn.customProfile ? 'offerChecked' : 'offer'}>
                        <div className="offerInfo">
                            <div className="radios">
                                <input 
                                type="checkbox"
                                name="customProfile"
                                checked={selectAddsOn.customProfile}
                                onChange={handleAddsChange} />
                            </div>
                            <div className="infos">
                                <h3>Customisable profile</h3>
                                <p>Custom theme in your profile</p>
                            </div>
                        </div>
                        <div className="offerPrice">
                            <span>+${planPriceIs.customProfile}{planPriceIs.blAdvanced}</span>
                        </div>
                    </div>
                </div>
                <div className="btnWrapperAdds hideForMobile">
                    <button className="btn2" onClick={handlePrev}>Go Back</button>
                    <button className="btn1" onClick={handleNextToBl}>Next Step</button>
                </div>
            </div>
        )
    }

    const FinishingUp = () => {
        return (
            <div className="planWrapper">
                <h1>Finishing up</h1>
                <p className="par">Double-check everything looks OK before confirming.</p>
                <div className="billingsWrapper">
                    <div className="nameAndPrice">
                        <div className="finalPlanselected">
                            <h3>{selectedPlan} ({monthlyOrYearly})</h3>
                            <span onClick={() => {setCurrentIndex(1)}} className="dd2">change</span>
                        </div>
                        <div>
                            <span>{price}</span>
                        </div>
                    </div>
                    <span className="line"></span>
                    <div >
                        {(selectAddsOn.onlineService) ? <div className="addsSelected">
                            <span className="addsOn">Online Services</span>
                            <span className="addsOnPrice">+${planPriceIs.onlineService}{planPriceIs.blAdvanced}</span>
                        </div> : null}
                        {(selectAddsOn.storage) ? <div className="addsSelected">
                            <span className="addsOn">Larger Storage</span>
                            <span className="addsOnPrice">+${planPriceIs.storage}{planPriceIs.blAdvanced}</span>
                        </div> : null}
                        {(selectAddsOn.customProfile) ? <div className="addsSelected">
                            <span className="addsOn">Customizable profile</span>
                            <span className="addsOnPrice">+${planPriceIs.customProfile}{planPriceIs.blAdvanced}</span>
                        </div> : null}
                    </div>
                </div>
                <div className="addsSelected mergMore">
                    <span>Total ({paymentMode})</span>
                    <span className="totalPrice">+${price}{planPriceIs.blAdvanced}</span>
                </div>
                <div className="btnWrapperAdds  hideForMobile">
                    <button className="btn2" onClick={handlePrev}>Go Back</button>
                    <button className="checkoutBtn" onClick={handleConfirmOrder}>Confirm</button>
                </div>
            </div>
        )
    }

    const ConfirmingPayment = () => {
        return (
            <div className="lastMsgCard">
                <img src="./images/icon-thank-you.svg" alt="" />
                <h2>Thank you!</h2>
                <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you need support, please feel free to email us at support@lorengaming.com.</p>
            </div>
        )
    }

    const parts = {
        0: <InfoChart />,
        1: <PlanChart />,
        2: <AddsChart />,
        3: <FinishingUp />,
        4: <ConfirmingPayment />,
    };

    return ( <div className="page">
        <div className="formWrapper">
            <div className="stepWrapper">
                <div className="stepcir">
                    <div className={(currentIndex === 0) ? 'cirStepActive' : 'cirStep'}>
                        <span>1</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 1</span>
                        <span className="heavySpan">Your Info</span>
                    </div>
                </div>
                <div className="stepcir">
                    <div className={(currentIndex === 1) ? 'cirStepActive' : 'cirStep'}>
                        <span>2</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 2</span>
                        <span className="heavySpan">select plan</span>
                    </div>
                </div>
                <div className="stepcir">
                    <div className={(currentIndex === 2) ? 'cirStepActive' : 'cirStep'}>
                        <span>3</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 3</span>
                        <span className="heavySpan">add-ons</span>
                    </div>
                </div>
                <div className="stepcir">
                    <div className={(currentIndex === 3 || currentIndex === 4) ? 'cirStepActive' : 'cirStep'}>
                        <span>4</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 4</span>
                        {/* {nameRef} */}
                        <span className="heavySpan">summary</span>
                    </div>
                </div>
            </div>
            {parts[currentIndex]}
            <div className={(currentIndex === 4) ? 'hide' : 'test1 hideForDesktop'}>
                <button className={(currentIndex > 0) ? 'btnPrev' : 'hide'} onClick={handlePrev}>back</button>
                <button className={(currentIndex === 3) ? 'hide' : 'btnNxtFrmInfo'} onClick={handleMultiNext}>next</button>
                <button className={(currentIndex === 3) ? 'checkoutBtn' : 'hide'} onClick={handleMultiNext}>Confirm</button>
            </div>
        </div>
    </div> );
};

export default FromPage;
