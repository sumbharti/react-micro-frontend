import { Office365UsersService } from './generated/services/Office365UsersService';
import type { User } from './generated/models/Office365UsersModel';
import { useEffect, useState } from 'react';

const Office365 = () => {

    const [profileUser, setProfileUser] = useState<User | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        const loadOffice365Profile = async () => {
            var result = await Office365UsersService.MyProfile();
            if(result.success) {
                setProfileUser(result.data);
            }
        }

        loadOffice365Profile();
    }

    return(<>
        <p>Logged in user:</p>
        <ul>
            <li>Id: {profileUser?.Id}</li>
            <li>Name: {profileUser?.DisplayName}</li>
        </ul>
    </>);
}

export default Office365;