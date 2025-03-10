import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserContext";
import { confirmDialog } from 'primereact/confirmdialog';
import { useState, useEffect } from "react";

export default function TopBar() {
    const navigate = useNavigate();
    const { setUserName } = useUser();
    const { userName } = useUser();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const quitApp = () => {
        confirmDialog({
            message: 'Desela sair do aplicativo?',
            header: 'Sair do aplicativo',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                setUserName('');
                navigate('/');
            },
        });
    }

    const toggleSidebar = (event: React.MouseEvent) => {
        event.stopPropagation();
        setSidebarVisible(!sidebarVisible);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.querySelector('.sidebar-menu');
            if (sidebar && !sidebar.contains(event.target as Node) && sidebarVisible) {
                setSidebarVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [sidebarVisible]);

    return (
        <div className="top-menu flex justify-content-between flex-wrap p-4">
            <div className="flex justify-content-center flex-wrap gap-3">
                <img src="menu_btn.png" style={{ height: 50, cursor: 'pointer' }} onClick={toggleSidebar} />
                <img src="teddy_logo.png" style={{ height: 50 }} />
            </div>
            <div className="flex justify-content-center flex-wrap gap-5 my-3">
                <NavLink to="/customer-list" className={({ isActive }) => isActive ? 'menu-item-actived' : 'menu-item'}>Clientes</NavLink>
                <NavLink to="/selected-customer-list" className={({ isActive }) => isActive ? 'menu-item-actived' : 'menu-item'}>Clientes Selecionados</NavLink>
                <div className="menu-item cursor-pointer" onClick={quitApp}>Sair</div>
            </div>
            <div className=" my-3">Olá, <b>{userName || '...'}!</b></div>
            <div className={`sidebar-menu ${sidebarVisible ? 'visible' : ''}`}>
                <NavLink to="/" className="menu-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    Home
                </NavLink>
                <NavLink to="/customer-list" className="menu-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v3h6v-3c0-2.66-5.33-4-8-4z"/></svg>
                    Clientes
                </NavLink>
                <NavLink to="/selected-customer-list" className="menu-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v3h6v-3c0-2.66-5.33-4-8-4z"/></svg>
                    Clientes Selecionados
                </NavLink>
            </div>
        </div>
    );
}