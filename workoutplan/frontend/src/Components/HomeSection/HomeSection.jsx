import React from 'react'
import { Avatar } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik';

const validationSchema = Yup.object().shape({
    content:Yup.string().required("Text is required")
})

const HomeSection = () => {

    const handleSubmit=(values) => {
        console.log("values ",values)
    }

    const formik = useFormik({
        initialValues:{
            content:"",
            image:""
        },
        onSubmit:handleSubmit,
        validationSchema,
    })

  return (
    <div className='space-y-5' style={{ marginTop: '20px' }}>
        <section>
            <h1 className='py-5 text-xl font-bold opacity-90'>Home</h1>
        </section>
        <section className={`pb-10`}>
            <div className='flex space-x-5'>
                <Avatar alt = "username"
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrowmdX6ori_jJ9sC6eU8O1eNxhicSVNsg4NMIY9epBQ&s'
                />
                <div className='w-full'>
                    <form>
                        <div>
                            <input type="text" name='content' placeholder='What is Happening?' className={`border-non outline-non text-xl bg-transparent`}
                            {...formik.getFieldProps("content")}/>
                            {formik.errors.content && formik.touched.content && (
                                <span className='text-red-500'>{formik.errors.content}</span>
                            )}
                        </div>

                        {/*<div>
                            <img src="" alt="" />
                        </div>*/}
                        
                        <div>

                        </div>
                    </form>

                </div>
            </div>

        </section>

    </div>
  )
}

export default HomeSection