import { useState,  useEffect, useRef } from "react";
import Switch from '@mui/material/Switch';

const FromPage = () => {
    const [flag, setFlag] = useState(0)
    const [test, setTest] = useState(1)
    const [price, setPrice] = useState(0)
    const [selectedPlan, setSelectedPlan] = useState('')
    const [monthlyOrYearly, setMonthlyOrYearly] = useState('')
    const [paymentMode, setPaymentMode] = useState('')
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const [dataForm, setDataForm] = useState({
        name:"",
        email:"",
        phoneNumber:"",
    })
    const [planPrice, setPlanPrice] = useState({
        arcade: 0,
        advanced:0,
        pro:0,
        onliceService:0,
        storage:0,
        customProfile:0,
        blArcade: '',
        blAdvanced: '',
        blPro: '',
    })

    const [selectAddsOn, setSelectedAddsOn] = useState({
        onlineService: false,
        storage: false,
        customProfile: false,
    })


    const handleAddsChange = (event) => {
        const { name, checked } = event.target;
        setSelectedAddsOn((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };
    
    const [currentIndex, setCurrentIndex] = useState(0)

    const HandleNextStep = () => {
        const nameValue = nameRef.current.value;
        const emailValue = emailRef.current.value;
        const phoneValue = phoneRef.current.value;
        setDataForm({
            name: nameValue,
            email: emailValue,
            phoneNumber: phoneValue,
        });
        if (!nameValue || !emailValue || !phoneValue) {
            if (!nameValue) {
                setFlag(1);
            }
            if (!emailValue) {
                setFlag(2);
            }
            if (!phoneValue) {
                setFlag(3);
            }
            if (!nameValue && !emailValue && !phoneValue) {
                setFlag(4);
            }
            return;
        }
        setFlag(0);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };
    

    // const handleTest = () => {
    //     setTest(prev => (prev === 1 ? 2 : 1))
    //      if (test === 2) {
    //         setPrice(price / 10)
    //     } if (test === 1) {
    //         setPrice(price * 10)
    //     }
    // }

    const handleTest = () => {
        setTest((prevTest) => {
            const newTest = prevTest === 1 ? 2 : 1; // Toggle between 1 (monthly) and 2 (yearly)
    
            let newPrice = 0;
    
            // Base plan price adjustment
            if (selectedPlan) {
                const basePrice = planPrice[selectedPlan.toLowerCase()];
                newPrice += newTest === 1 ? basePrice : basePrice * 10;
            }
    
            // Add-ons adjustment
            if (selectAddsOn.onlineService) {
                newPrice += newTest === 1 ? planPrice.onlineService : planPrice.onlineService * 10;
            }
            if (selectAddsOn.storage) {
                newPrice += newTest === 1 ? planPrice.storage : planPrice.storage * 10;
            }
            if (selectAddsOn.customProfile) {
                newPrice += newTest === 1 ? planPrice.customProfile : planPrice.customProfile * 10;
            }
    
            setPrice(newPrice); // Update the price
            return newTest; // Update the test state
        });
    };
    

    const handleNext = () => {
        setPrice(price)
        if (price > 0) {
            setCurrentIndex(currentIndex + 1)
        }
    }
    const handleNextToBl = () => {
        console.log('Selected adds are:', selectAddsOn);
        console.log('test is now : ', test)
        let newPrice = price;
        if (selectAddsOn.customProfile) {
            if (test === 2) {
                newPrice += 20;
            } else {
                newPrice += 2;
            }
        }
        if (selectAddsOn.onlineService) {
            if (test === 2) { 
                newPrice += 10;
            } else {
                newPrice += 1;
            }
        }
        if (selectAddsOn.storage) {
            if (test === 2) {
                newPrice += 20;
            } else {
                newPrice += 2;
            }
        }
        setPrice(newPrice); 
        if (newPrice > 0) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }
    const handlePrev2 = () => {
        setPrice(0)
        setSelectedPlan(null)
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }


    const [checkOut, setCheckOut] = useState({
        planName: '',
        planPrice: '',
    })
    useEffect(() => {
        if (test === 1) {
          setPlanPrice({
            arcade: 9,
            advanced: 12,
            pro: 15,
            onliceService:1,
            storage:2,
            customProfile:2,
            blArcade: '/mo',
            blAdvanced: '/mo',
            blPro: '/mo',
          });
          setMonthlyOrYearly('Monthly')
          setPaymentMode('per month')
          if (selectedPlan === 'Arcade') {
            setCheckOut({
                planName: 'Arcade',
            })
            if (test === 1) {
                setCheckOut({
                    planPrice: '$90/yo'
                })
            }
          }
        } else if (test === 2) {
          setPlanPrice(prevState => ({
            ...prevState,
            arcade: 90,
            advanced: 120,
            pro: 150,
            onliceService:10,
            storage:20,
            customProfile:20,
            blArcade: '/yr',
            blAdvanced: '/yr',
            blPro: '/yr',
          }));
          setMonthlyOrYearly('Yearly')
          setPaymentMode('per year')
        }
      }, [test,selectedPlan]);

    const handleSelectedPlan = (prices, selectedPlanName) => {

        const basePrice = test === 1 ? prices : prices * 10
        setPrice(basePrice)
        setSelectedPlan(selectedPlanName)
        // if (test === 1) {
        //     setPrice(prices)
        // } if (test === 2) {
        //     setPrice(prices * 10)
        // }
        // console.log(selectedPlan)
    }
    // const InfoChart = () => {
    //     return <div className="infoWrapper">
    //         <h2>Personal info</h2>
    //         <p>Please provide your name, email adress and phone number.</p>
    //         <div className="labelHolder">
    //             <label htmlFor="name">Name</label>
    //             <label htmlFor="name" className={ ${(flag === 1 || flag === 4) ? 'errorMsg' : 'hide'}}>This field is required</label>
    //         </div>
    //         <input type="text" id="name" ref={nameRef} />
    //         <div className="labelHolder">
    //             <label htmlFor="email">Email Adress</label>
    //             <label htmlFor="email" className={ ${(flag === 2 || flag === 4) ? 'errorMsg' : 'hide'}}>This field is required</label>
    //         </div>
    //         <input type="email" id="email" ref={emailRef}/>
    //         <div className="labelHolder">
    //             <label htmlFor="phoneNumber">Phone Number</label>
    //             <label htmlFor="phoneNumber" className={ ${(flag === 3 || flag === 4) ? 'errorMsg' : 'hide'}}>This field is required</label>
    //         </div>
    //         <input type="number" id="phoneNumber" ref={phoneRef}/>
    //         <button onClick={HandleNextStep} className="btnNxtFrmInfo">Next Step</button>
    //     </div>
    // }
    const PlanChart = () => {
        return <div className="planWrapper">
            <h2>select your plan</h2>
            <p>you have the option of monthly or yearly billing</p>
            <div className="offers">
                <div className={selectedPlan === 'Arcade' ? 'offerCard check' : 'offerCard'} 
                onClick={() => {
                    handleSelectedPlan(planPrice.arcade, 'Arcade') ;
                }}>
                    <img src="/images/icon-arcade.svg" alt="" />
                    <div className="tester">
                        <span>Arcade</span>
                        <span className="priceIs">${planPrice.arcade}{planPrice.blArcade}</span>
                        <span className={test === 2 ? 'activeSpan' : 'hide'}>2 months free</span>
                    </div>
                </div>
                <div className={selectedPlan === 'advanced' ? 'offerCard check' : 'offerCard'} 
                onClick={() => {
                    handleSelectedPlan(planPrice.advanced, 'advanced') ;
                }}>
                    <img src="/images/icon-advanced.svg" alt="" />
                    <div className="tester">
                        <span>Advanced</span>
                        <span className="priceIs">${planPrice.advanced}{planPrice.blAdvanced}</span>
                        <span className={test === 2 ? 'activeSpan' : 'hide'}>2 months free</span>
                    </div>
                </div>
                <div className={selectedPlan === 'pro' ? 'offerCard check' : 'offerCard'} 
                onClick={() => {
                    handleSelectedPlan(planPrice.pro, 'pro') ;
                }}>
                    <img src="/images/icon-pro.svg" alt="" />
                    <div className="tester">
                        <span>Pro</span>
                        <span className="priceIs">${planPrice.pro}{planPrice.blPro}</span>
                        <span className={test === 2 ? 'activeSpan' : 'hide'}>2 months free</span>
                    </div>
                </div>
            </div>
            <div className="billingSelect">
                <span>monthly</span>
                <Switch 
                checked={test === 2}
                onChange={handleTest}
                inputProps={{
                    'aria-checked': test === 2,
                    'aria-label': Switch is set to ${test === 1 ? '1' : '2'},
                }}
                
                />
                <span>yearly</span>
            </div>
            <div className="btnWrapper">
                <button className="btn2" onClick={handlePrev}>Go Back</button>
                <button className="btn1" onClick={handleNext}>Next Step</button>
            </div>
        </div>
    }
    const AddsChart = () => {
        return (
            <div className="addsWrapper">
                <h1>Pick Adds-ons</h1>
                <p>Add-ons help enhance your experience.</p>
                <div className="offerHolder">
                    <div className="offer">
                        <div className="offerInfo">
                            <div className="radios">
                                <input
                                    type="checkbox"
                                    name="onlineService"
                                    checked={selectAddsOn.onlineService}
                                    onChange={handleAddsChange}
                                />
                            </div>
                            <div className="infos">
                                <h3>Online service</h3>
                                <p>Access to multiplayer games</p>
                            </div>
                        </div>
                        <div className="offerPrice">
                            <span>+${planPrice.onliceService}{planPrice.blAdvanced}</span>
                        </div>
                    </div>
                    <div className="offer">
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
                            <span>+${planPrice.storage}{planPrice.blAdvanced}</span>
                        </div>
                    </div>
                    <div className="offer">
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
                            <span>+${planPrice.customProfile}{planPrice.blAdvanced}</span>
                        </div>
                    </div>
                </div>
                <div className="btnWrapperAdds">
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
                {/* <span>last price is : {price}{selectedPlan}</span> */}
                <div className="billingsWrapper">
                    <div className="nameAndPrice">
                        <div className="finalPlanselected">
                            <h3>{selectedPlan} ({monthlyOrYearly})</h3>
                            <a href="/"><span>change</span></a>
                        </div>
                        <div>
                            <span>{checkOut.planPrice}</span>
                        </div>
                    </div>
                    <span className="line"></span>
                    <div >
                        {(selectAddsOn.onlineService) ? <div className="addsSelected">
                            <span className="addsOn">Online Services</span>
                            <span className="addsOnPrice">+${planPrice.onliceService}{planPrice.blAdvanced}</span>
                        </div> : null}
                        {(selectAddsOn.storage) ? <div className="addsSelected">
                            <span className="addsOn">Larger Storage</span>
                            <span className="addsOnPrice">+${planPrice.storage}{planPrice.blAdvanced}</span>
                        </div> : null}
                        {(selectAddsOn.customProfile) ? <div className="addsSelected">
                            <span className="addsOn">Customizable profile</span>
                            <span className="addsOnPrice">+${planPrice.customProfile}{planPrice.blAdvanced}</span>
                        </div> : null}
                    </div>
                </div>
                <div className="addsSelected mergMore">
                    <span>Total ({paymentMode})</span>
                    <span className="totalPrice">+${price}{planPrice.blAdvanced}</span>
                </div>
                <div className="btnWrapperAdds upper">
                    <button className="btn2" onClick={handlePrev2}>Go Back</button>
                    <button className="checkoutBtn" onClick={handleNextToBl}>Confirm</button>
                </div>
            </div>
        )
    }

    const parts = {
        0: <InfoChart />,
        1: <PlanChart />,
        2: <AddsChart />,
        3: <FinishingUp />,
    }

    return ( <div className="page">
        <div className="formWrapper">
            <div className="stepWrapper">
                <div className="stepcir">
                    <div className="cirStep">
                        <span>1</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 1</span>
                        <span className="heavySpan">Your Info</span>
                    </div>
                </div>
                <div className="stepcir">
                    <div className="cirStep">
                        <span>2</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 2</span>
                        <span className="heavySpan">select plan</span>
                    </div>
                </div>
                <div className="stepcir">
                    <div className="cirStep">
                        <span className="lightSpan">3</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 3</span>
                        <span className="heavySpan">add-ons</span>
                    </div>
                </div>
                <div className="stepcir">
                    <div className="cirStep">
                        <span>4</span>
                    </div>
                    <div className="stepTitle">
                        <span className="lightSpan">step 4</span>
                        {/* {nameRef} */}
                        <span className="heavySpan">summary</span>
                    </div>
                </div>
            </div>
            {price}
           {parts[currentIndex]}
        </div>
    </div> );
}
 
export default FromPage;

edit it urself
