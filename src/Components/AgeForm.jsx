import React, { useEffect, useState } from 'react'
import './AgeForm.css'

const AgeForm = () => {

    const [results, setResult] = useState(false)
    const [convertedAge, setConvertedAge] = useState()
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [errors, setErrors] = useState({
        day: false,
        month: false,
        year: false,
    })
    const [required, setRequired] = useState({
        day: false,
        month: false,
        year: false,
    })
    const [yearLow, setYearLow] = useState(false)

    // Getting values from inputs

    const usersDayHandler = (e) => {
        setDay(e.target.value)
        setResult(false)
    }
    const usersMonthHandler = (e) => {
        setMonth(e.target.value)
        setResult(false)
    }
    const usersYearHandler = (e) => {
        setYear(e.target.value)
        setResult(false)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const today = new Date()
        const currentYear = today.getFullYear();

        // Reset Errors
        setErrors({
            day: false,
            month: false,
            year: false,
        })
        setRequired({
            day: false,
            month: false,
            year: false,
        })
        setYearLow(false)
        // Perform validation

        let hasErrors = false

        if (day <= 0 || day > 31) {
            setErrors((prevState) => ({ ...prevState, day: true }))
            hasErrors = true
        }
        if (day.length < 1) {
            setRequired((prevState) => ({ ...prevState, day: true }))
            setErrors((prevState) => ({ ...prevState, day: false }))
        }
        if (month <= 0 || month > 12) {
            setErrors((prevState) => ({ ...prevState, month: true }))
            hasErrors = true
        }
        if (month.length < 1) {
            setRequired((prevState) => ({ ...prevState, month: true }))
            setErrors((prevState) => ({ ...prevState, month: false }))
        }
        if (year > currentYear) {
            setErrors((prevState) => ({ ...prevState, year: true }))
            hasErrors = true
        }
        if (year < 1900) {
            setYearLow(true)
            hasErrors = true
        }
        if (year.length < 1) {
            setRequired((prevState) => ({ ...prevState, year: true }))
            setErrors((prevState) => ({ ...prevState, year: false }))
            setYearLow(false)
        }

        if (hasErrors) {
            setResult(false)
            return
        }

        setResult(true)
        // Calculate age
        const birthdate = new Date(year, month - 1, day)
        const diff = today - birthdate
        const ageYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
        const ageMonths = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)))
        const ageDays = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24))

        setConvertedAge({ years: ageYears, months: ageMonths, days: ageDays })
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={formSubmitHandler}>
                    <div className='form-control'>
                        <label className={`${!errors.day ? 'day' : 'error'} ${!required.day ? '' : 'required'}`} htmlFor='day'>Day</label>
                        <input className={`${!errors.day ? '' : 'error'} ${!required.day ? '' : 'required'}`} type='number' name='day' onChange={usersDayHandler} value={day}></input>
                        {errors.day && (
                            <span className='error'>Must be a valid day</span>
                        )}
                        {required.day && (
                            <span className='required'>This field is required</span>
                        )}
                    </div>
                    <div className='form-control'>
                        <label className={`${!errors.month ? 'day' : 'error'} ${!required.month ? '' : 'required'}`} htmlFor='month'>Month</label>
                        <input className={`${!errors.month ? '' : 'error'} ${!required.month ? '' : 'required'}`} type='number' name='month' onChange={usersMonthHandler} value={month}></input>
                        {errors.month && (
                            <span className='error'>Must be a valid month</span>
                        )}
                        {required.month && (
                            <span className='required'>This field is required</span>
                        )}
                    </div>
                    <div className='form-control'>
                        <label className={`${!errors.year ? 'day' : 'error'} ${!required.year ? '' : 'required'} ${!yearLow ? '' : 'required'}`} htmlFor='year'>Year</label>
                        <input className={`${!errors.year ? '' : 'error'} ${!required.year ? '' : 'required'} ${!yearLow ? '' : 'required'}`} type='number' name='year' onChange={usersYearHandler} value={year}></input>
                        {errors.year && (
                            <span className='error'>Must be in the past</span>
                        )}
                        {required.year && (
                            <span className='required'>This field is required</span>
                        )}
                        {yearLow && (
                            <span className='required'>The year must be 1900 or higher</span>
                        )}
                    </div>
                    <input className='submit-btn' value='Submit' type='submit'></input>
                </form>
                <div className='result-wrapper'>
                    {results ? (
                        <span className='number'>{convertedAge.years}</span>
                    ) : (
                        <span className='minus'>--</span>
                    )}
                    <span className='name'>years</span>
                </div>
                <div className='result-wrapper'>
                    {results ? (
                        <span className='number'>{convertedAge.months}</span>
                    ) : (
                        <span className='minus'>--</span>
                    )}
                    <span className='name'>months</span>
                </div>
                <div className='result-wrapper'>
                    {results ? (
                        <span className='number'>{convertedAge.days}</span>
                    ) : (
                        <span className='minus'>--</span>
                    )}
                    <span className='name'>days</span>
                </div>
            </div >

        </>
    )
}

export default AgeForm
