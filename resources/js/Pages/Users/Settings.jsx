import React from 'react';
import UserDashboardLayout from '@/Layouts/UserDashboardLayout';
import CardContainer from '@/Components/CardContainer';
import FormSelect from '@/Components/FormSelect';
import { useForm,Link } from '@inertiajs/react';
import SaveButton from '@/Components/SaveButton';
import {MdArrowBack} from 'react-icons/md'
const Store = ({setting}) => {

    console.log(setting);
    const settingsForm = useForm({

        theme:setting?.theme || 'light',
    });


   const changeTheme = (e) => {
    const root = window.document.documentElement;
    const selected = e.target.value;

    // Remove all theme classes
    root.classList.remove('dark', 'light');

    if (selected === 'system') {
        // Detect system theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
        root.classList.add(selected);
    }

    settingsForm.setData('theme',selected);

   }
   const saveSetting = (e) => {
    e.preventDefault();
    settingsForm.post(route('settings.store'));
   }

    const themes=[
        {id:'light',name:'Light'},
        {id:'dark',name:'Dark'},
        {id:'system',name:'System'},
        ]
    return (
       <UserDashboardLayout head={'Settings'}>

        <CardContainer >
            <div  className='flex items-center justify-start gap-x-2'>
              
                                 <Link href={route('dashboard')} className=""><MdArrowBack className='text-4xl hover:scale-105 text-mainColor' /></Link>

                <h1 className="text-3xl md:text-4xl font-mono text-mainColor dark:text-white font-bold text-start my-6 md:my-10">
                
                Settings
                </h1>
            </div>
           
       
            <section  >
              <div>
                <FormSelect id={'theme'} label={'Theme'} options={themes} width='w-1/4' value={settingsForm.data.theme} onChange={changeTheme}/>
              </div>
              <div className='flex justify-end mt-5'>
                <SaveButton onClick={saveSetting}>Save</SaveButton>
              </div>
            </section>
        </CardContainer>

       </UserDashboardLayout>

    );
}

export default Store;
