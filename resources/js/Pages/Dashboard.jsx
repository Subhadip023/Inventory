import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Alert } from "flowbite-react";
import { Avatar } from "flowbite-react";
import SideBar from '@/Components/SideBar';
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';


export default function Dashboard() {

  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <Head title="Dashboard" />
      <section className='flex flex-wrap w-screen h-screen '>
        <SideBar classNames={`shadow-md transition-all duration-300 ease-in-out ${showSidebar ? 'w-64' : 'w-0 overflow-hidden'
          }`} />
        <section className={`h-fit  transition-all duration-300 ease-in-out ${showSidebar ? 'w-[calc(100%-16rem)]' : 'w-full'}`}>
          <Navbar fluid rounded className='z-10 shadow-md sticky top-0'>
            <RxHamburgerMenu className='hover:cursor-pointer scale-105' onClick={() => setShowSidebar(!showSidebar)} />
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </DropdownHeader>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Sign out</DropdownItem>
              </Dropdown>
              <NavbarToggle />
            </div>
            <NavbarCollapse>
              <NavbarLink href="#" active>
                Home
              </NavbarLink>
              <NavbarLink href="#">About</NavbarLink>
              <NavbarLink href="#">Services</NavbarLink>
              <NavbarLink href="#">Pricing</NavbarLink>
              <NavbarLink href="#">Contact</NavbarLink>
            </NavbarCollapse>
          </Navbar>
    <div className="overflow-y-auto overflow-x-hidden  p-4"> 
Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vel, amet excepturi labore facilis aut recusandae sed, nam odio neque sit eos! Ipsum ducimus omnis repellendus alias modi eligendi voluptatem quos est enim. Nemo architecto, a porro quasi optio molestiae! Fugit blanditiis sint iure, maxime provident quos? Delectus praesentium ab consequuntur aliquam rerum iste iure consequatur animi magnam aliquid placeat recusandae neque facere ipsa reiciendis asperiores, qui quos provident eos voluptate. Natus facilis et, tempore, totam voluptatibus reprehenderit enim omnis sunt, aliquid cum laborum eos sint. Vero rerum fuga unde nam atque tenetur odit facilis similique aspernatur magni necessitatibus doloribus aut vitae, earum nesciunt facere tempore id eveniet itaque quisquam soluta quo! Obcaecati necessitatibus modi commodi autem quia rem. Dolores laboriosam voluptatum fugiat consequatur amet vitae dolorum id molestias eligendi, minus blanditiis ipsa est! Beatae omnis, asperiores obcaecati provident minima dolorum saepe in deleniti ipsam dolorem alias earum molestias, odit ex officia enim temporibus ut modi ab itaque! Adipisci accusantium magni, eius ut possimus officiis numquam beatae, nulla debitis quia dolores odio ea culpa reiciendis amet ipsam consequuntur itaque iusto! Voluptates consectetur aut, sequi consequatur necessitatibus corporis quia cupiditate minima eligendi mollitia velit tenetur non suscipit rem labore ipsum. Facilis aspernatur modi enim saepe quo rerum, libero cupiditate voluptas dolorem perferendis repudiandae vel fugiat quod illum. Quis reiciendis eveniet, dignissimos voluptatem voluptas maxime hic, architecto, omnis quisquam nemo sit voluptates provident repellendus! Deleniti cupiditate reprehenderit quae fugiat aliquid minima repellat. Neque nobis veritatis cupiditate aperiam fugit iste velit perspiciatis minima et itaque. Velit, repellendus deserunt. Accusamus doloribus, eveniet ipsam vero architecto repellat facilis quisquam perferendis quibusdam ab eaque odio nostrum voluptas. Est repellat atque totam exercitationem quae cum sapiente amet fuga accusantium animi, mollitia fugiat eos recusandae, repellendus nihil magni nemo non sequi tempore asperiores tempora quisquam! Possimus sint molestias voluptatibus perferendis dolorem, modi at laudantium facere excepturi illo similique sit cumque error libero cupiditate deleniti veniam voluptatum id eum corrupti sapiente molestiae repellat iste ipsam. A tempore possimus iure fugit quod sed eligendi ab cupiditate ducimus ipsa voluptate minus, saepe consequatur nihil enim quam sint. Placeat, asperiores explicabo animi, quia sint obcaecati voluptas, ipsa ea quos officiis maiores? Alias ea velit quam tempora, minima, rem, unde nisi veritatis molestiae iure modi cumque ducimus dignissimos voluptatum in sit quisquam quasi esse autem laudantium eveniet nam quae assumenda dolore. Modi est quasi veritatis fugiat reiciendis repudiandae similique, quo hic ex facilis.      </div>

        </section>



      </section>

    </>
  );
}
