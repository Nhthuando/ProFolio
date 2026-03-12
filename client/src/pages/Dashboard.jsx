        import { useMemo, useState, useEffect } from 'react'
        import {useAuthStore} from '../store/authStore'
        import {getProfileApi} from '../api/userApi'
        import HeroSection from '../components/dashboard/HeroSection'
        import RecentGrid from '../components/dashboard/RecentGrid'
        import Sidebar from '../components/dashboard/Sidebar'
        const recentItems = [
        {
            id: 1,
            name: 'Portfolio cá nhân',
            type: 'Portfolio',
            updatedAt: '2 ngày trước',
            gradient: 'from-purple-500 to-pink-500',
            owner: 'mine',
        },
        {
            id: 2,
            name: 'Dự án E-Commerce',
            type: 'Project',
            updatedAt: '3 ngày trước',
            gradient: 'from-blue-500 to-cyan-500',
            owner: 'team',
        },
        {
            id: 3,
            name: 'ReactJS, NodeJS',
            type: 'Skills',
            updatedAt: '5 ngày trước',
            gradient: 'from-orange-400 to-yellow-400',
            owner: 'mine',
        },
        {
            id: 4,
            name: 'Intern tại ABC Corp',
            type: 'Experience',
            updatedAt: '1 tuần trước',
            gradient: 'from-green-500 to-teal-500',
            owner: 'mine',
        },
        {
            id: 5,
            name: 'Đại học XYZ',
            type: 'Education',
            updatedAt: '1 tuần trước',
            gradient: 'from-red-500 to-orange-500',
            owner: 'team',
        },
        {
            id: 6,
            name: 'GitHub, LinkedIn',
            type: 'Social Links',
            updatedAt: '2 tuần trước',
            gradient: 'from-indigo-500 to-purple-500',
            owner: 'mine',
        },
        ]

    
        function Dashboard() {
        const [activeTab, setActiveTab] = useState('design')
        const [viewMode, setViewMode] = useState('grid')
        const [searchInput, setSearchInput] = useState('')
        const [ownerFilter, setOwnerFilter] = useState('all')
        const [typeFilter, setTypeFilter] = useState('all')
        const [sortDirection, setSortDirection] = useState('asc')
        
        const { user, setAuth, token } = useAuthStore()
        const currentUser = user || { name: 'Người dùng', avatar: null }
        useEffect(() => {
        const fetchProfile = async () => {
        try {
        const profileData = await getProfileApi()
        setAuth({ token: token, user: profileData })      
        } catch (error) {
        console.error('Lỗi khi fetch profile:', error)
        }
    }
    
    fetchProfile()
    }, [])
        const filteredItems = useMemo(() => {
            const normalizedSearch = searchInput.trim().toLowerCase()

            let items = recentItems.filter((item) => {
            if (activeTab === 'templates' && !['Portfolio', 'Project'].includes(item.type)) {
                return false
            }

            if (ownerFilter !== 'all' && item.owner !== ownerFilter) {
                return false
            }

            if (typeFilter !== 'all' && item.type !== typeFilter) {
                return false
            }

            if (normalizedSearch.length === 0) {
                return true
            }

            return (
                item.name.toLowerCase().includes(normalizedSearch) ||
                item.type.toLowerCase().includes(normalizedSearch)
            )
            })

            items = items.sort((a, b) => {
            const compareResult = a.name.localeCompare(b.name, 'vi')
            return sortDirection === 'asc' ? compareResult : -compareResult
            })

            return items
        }, [activeTab, ownerFilter, searchInput, sortDirection, typeFilter])

        return (
            <div className="min-h-screen bg-slate-900 text-slate-100">
            <Sidebar currentUser={currentUser} />

            <main className="px-4 py-5 md:ml-72 md:px-10 md:py-8">
                <HeroSection
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />

                <RecentGrid
                items={filteredItems}
                ownerFilter={ownerFilter}
                setOwnerFilter={setOwnerFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                viewMode={viewMode}
                setViewMode={setViewMode}
                />
            </main>
            </div>
        )
        }

        export default Dashboard