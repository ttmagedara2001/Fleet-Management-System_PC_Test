/**
 * @module Header
 * @description Top-level application header with device selector, connection
 * status indicators, notification bell, live clock, and mobile menu toggle.
 */
import { useState, useRef, useEffect } from 'react';
import { Wifi, Radio, Server, Bell, Cpu, Menu, X, Check, Trash2, CheckCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDevice } from '../../contexts/DeviceContext';
import protonestLogo from '../../assets/logo.avif';

// ─── Dropdown Item (hover handled via React state, no Tailwind) ──────────────
const DropdownItem = ({ label, href, active, onClick }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                margin: '2px 6px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '14px',
                fontWeight: active ? 600 : 400,
                color: active ? '#FFFFFF' : hovered ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                background: active
                    ? 'rgba(164,143,255,0.10)'
                    : hovered
                        ? 'rgba(255,255,255,0.05)'
                        : 'transparent',
                transition: 'background 0.15s ease, color 0.15s ease',
                cursor: 'pointer',
            }}
        >
            <span
                style={{
                    flexShrink: 0,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: active ? '#A48FFF' : '#5530FA',
                }}
            />
            <span style={{ flex: 1, lineHeight: '1.35' }}>{label}</span>
            {active && (
                <span
                    style={{
                        flexShrink: 0,
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        color: '#A48FFF',
                        border: '1px solid rgba(164,143,255,0.45)',
                        background: 'rgba(164,143,255,0.10)',
                        borderRadius: '6px',
                        padding: '3px 8px',
                    }}
                >
                    Current
                </span>
            )}
        </a>
    );
};

// ─── Brand Bar ───────────────────────────────────────────────────────────────
/**
 * BrandBar — 88 px sticky top stripe.
 *
 * • Background  : solid #060B26
 * • Bottom border: 1 px #5530FA
 * • Left   : Protonest logo  +  "Go Back To Website" link
 * • Center : "Fleet Management System" title with dropdown chevron
 * • Right  : "View Full Code" frosted-glass button
 */
const BrandBar = () => {
    const [titleOpen, setTitleOpen] = useState(false);

    // Close dropdown when clicking outside
    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setTitleOpen(false);
            }
        }
        if (titleOpen) document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [titleOpen]);

    return (
        <div
            className="brand-bar w-full flex items-center justify-between"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 300,
                backgroundColor: '#060B26',
                borderBottom: '1.5px solid rgba(85, 48, 250, 0.70)',
                boxShadow: '0 2px 28px rgba(85, 48, 250, 0.20)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            {/* ── Left: Protonest logo + back link ── */}
            <div className="flex items-center min-w-0 sm:min-w-[180px] mr-2 sm:mr-8">
                <a
                    href="https://protonestconnect.co/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 group"
                    aria-label="Protonest — Go back to website"
                >
                    <img
                        src={protonestLogo}
                        alt="Protonest logo"
                        className="h-10 w-10 object-contain flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    />
                    <span
                        className="hidden sm:inline text-white/80 group-hover:text-white transition-colors duration-200 whitespace-nowrap ml-0.5"
                        style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: '12px',
                            fontWeight: 400,
                        }}
                    >
                        ‹ Go Back To Website
                    </span>
                </a>
            </div>

            {/* ── Center: Title with dropdown chevron ── */}
            <div className="flex-1 flex justify-center" ref={dropdownRef}>
                <button
                    onClick={() => setTitleOpen(v => !v)}
                    className="flex items-center gap-2 group px-4 py-2 rounded-xl hover:bg-white/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A48FFF]"
                    aria-expanded={titleOpen}
                    aria-haspopup="listbox"
                >
                    <span
                        className="brand-bar-title text-white select-none"
                        style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Fleet Management System
                    </span>
                    <ChevronDown
                        className={`w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300 ${titleOpen ? 'rotate-180 text-[#A48FFF]' : ''}`}
                    />
                </button>

                {/* Dropdown flyout */}
                {titleOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '88px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 200,
                            marginTop: '4px',
                            width: '288px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: '#0F1535',
                            border: '1px solid rgba(85, 48, 250, 0.5)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                        }}
                    >
                        {/* Header label */}
                        <div
                            style={{
                                padding: '14px 20px 12px',
                                borderBottom: '1px solid rgba(255,255,255,0.07)',
                            }}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    color: '#818CF8',
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.16em',
                                }}
                            >
                                Switch System
                            </p>
                        </div>

                        {/* Items */}
                        <div style={{ padding: '6px 0' }}>
                            {[
                                {
                                    label: 'Fleet Management System',
                                    href: 'https://gentle-flower-091576403.6.azurestaticapps.net/',
                                    active: true,
                                },
                                {
                                    label: 'Plant Monitoring System',
                                    href: 'https://ambitious-bay-0d5177503.4.azurestaticapps.net/',
                                    active: false,
                                },
                                {
                                    label: 'Factory Management System',
                                    href: 'https://witty-grass-0d4e8e603.6.azurestaticapps.net/',
                                    active: false,
                                },
                            ].map(({ label, href, active }) => (
                                <DropdownItem
                                    key={label}
                                    label={label}
                                    href={href}
                                    active={active}
                                    onClick={() => setTitleOpen(false)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Right: "View Full Code" button ── */}
            <div className="flex items-center justify-end min-w-0 sm:min-w-[180px] ml-2 sm:ml-8">
                <a
                    href="https://github.com/ProtonestIoT/PC-Fleet-management-system"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center font-semibold text-white rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A48FFF]"
                    style={{
                        height: '34px',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 600,
                        background: 'rgba(164, 143, 255, 0.12)',
                        border: '1px solid rgba(164, 143, 255, 0.3)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: '8px',
                        padding: '0 10px',
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <span className="hidden sm:inline">View Full Code</span>
                    <span className="sm:hidden">&lt;/&gt; Code</span>
                </a>
            </div>
        </div>
    );
};

function Header({ onMenuToggle, sidebarOpen }) {
    const { isAuthenticated, isDemoMode } = useAuth();
    const { devices, selectedDeviceId, setSelectedDeviceId, alerts, isConnected, clearAlert, clearAllAlerts, markAlertRead, markAllAlertsRead } = useDevice();

    const unreadAlerts = alerts.filter(a => !a.read).length;
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);
    const bellRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [now, setNow] = useState(new Date());

    // Clock timer
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    // Click outside to close notifications (desktop only)
    useEffect(() => {
        function handleClickOutside(e) {
            if (notifRef.current && !notifRef.current.contains(e.target) &&
                bellRef.current && !bellRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
        }
        if (showNotifications && !isMobile) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showNotifications, isMobile]);

    // Responsive detection
    useEffect(() => {
        function onResize() {
            setIsMobile(window.innerWidth <= 768);
        }
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Escape key to close mobile notifications
    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape' && showNotifications) setShowNotifications(false);
        }
        if (showNotifications) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [showNotifications]);

    // Lock body scroll when mobile notifications are open
    useEffect(() => {
        if (showNotifications && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showNotifications, isMobile]);

    // Date/time formatting helpers
    function getOrdinal(n) {
        const v = n % 100;
        if (v >= 11 && v <= 13) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    function formatDatePretty(d) {
        if (!d) return '';
        try {
            const day = d.getDate();
            const ordinal = getOrdinal(day);
            const weekday = d.toLocaleDateString(undefined, { weekday: 'short' });
            const month = d.toLocaleDateString(undefined, { month: 'short' });
            const year = d.getFullYear();
            return `${day}${ordinal} ${weekday}, ${month} ${year}`;
        } catch (e) {
            return d.toLocaleDateString();
        }
    }

    function formatTimePretty(d) {
        if (!d) return '';
        return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    function formatAlertTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString();
    }

    function getAlertIcon(type) {
        if (type === 'critical') return '🔴';
        if (type === 'warning') return '🟡';
        return '🟢';
    }

    const toggleNotifications = () => {
        setShowNotifications(s => !s);
    };

    return (
        <>
            <BrandBar />
            <header
                className="app-header-bar w-full fixed left-0 right-0 z-[100] h-16 flex items-center gap-3"
                style={{
                    background: 'linear-gradient(135deg, #6B21A8 0%, #7C3AED 50%, #9333EA 100%)',
                    boxShadow: '0 4px 24px rgba(107, 33, 168, 0.45), 0 1px 0 rgba(255,255,255,0.08) inset',
                }}
            >
                {/* Mobile Menu Button — shown on ≤1024 px */}
                <button
                    className="flex lg:hidden items-center justify-center w-10 h-10 bg-white/15 rounded-[10px] text-white shrink-0 transition-all duration-200 hover:bg-white/25 hover:-translate-y-px border border-white/20 backdrop-blur-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] focus:outline-none mr-1 sm:mr-2"
                    onClick={onMenuToggle}
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                >
                    {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2.5 shrink-0 mr-1 sm:mr-4">
                    <div className="w-10 h-10 bg-[#5530FA] rounded-lg flex items-center justify-center text-white shadow-md">
                        <Cpu size={22} />
                    </div>
                    <span
                        className="text-[22px] font-bold text-white tracking-tight hidden md:inline"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        Fabrix
                    </span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Date/Time — hidden on small portrait screens */}
                <div className="hidden lg:flex flex-col items-end text-white/90 mr-5">
                    <div
                        className="text-[11px] font-medium opacity-80 leading-none"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        {formatDatePretty(now)}
                    </div>
                    <div
                        className="text-[15px] font-semibold mt-[3px] leading-none"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        {formatTimePretty(now)}
                    </div>
                </div>

                {/* Device Selector */}
                <div className="shrink-0 mr-1">
                    <select
                        value={selectedDeviceId}
                        onChange={(e) => setSelectedDeviceId(e.target.value)}
                        className="bg-white border-none py-[9px] pl-3.5 pr-9 rounded-lg text-[14px] font-medium min-w-[130px] sm:min-w-[150px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 transition-shadow duration-200"
                        style={{
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            fontFamily: "'Inter', system-ui, sans-serif",
                        }}
                    >
                        {devices.map(device => (
                            <option key={device.id} value={device.id}>
                                {device.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Right Icons Section */}
                <div className="flex items-center gap-2.5 sm:gap-4">
                    {/* Connection Status Icons — hidden on xs screens */}
                    <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
                        <div
                            className={`w-9 h-9 rounded-[10px] border flex items-center justify-center transition-all duration-200 cursor-default backdrop-blur-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:-translate-y-px ${isConnected || isDemoMode
                                ? 'bg-green-500/25 border-green-400/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                : 'bg-white/10 border-white/20 text-white/60'
                                }`}
                            title={isDemoMode ? 'Mock WebSocket (Demo)' : 'WebSocket Status'}
                        >
                            <Wifi size={16} />
                        </div>
                        <div
                            className="w-9 h-9 bg-green-500/25 border border-green-400/50 rounded-[10px] flex items-center justify-center text-green-400 cursor-default backdrop-blur-[8px] shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            title={isDemoMode ? 'Mock API (Demo)' : 'HTTP API'}
                        >
                            <Radio size={16} />
                        </div>
                        <div
                            className={`w-9 h-9 rounded-[10px] border flex items-center justify-center transition-all duration-200 cursor-default backdrop-blur-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:-translate-y-px ${isAuthenticated
                                ? 'bg-green-500/25 border-green-400/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                : 'bg-white/10 border-white/20 text-white/60'
                                }`}
                            title={isDemoMode ? 'Demo Server' : 'Server'}
                        >
                            <Server size={16} />
                        </div>
                    </div>

                    {/* Notification Bell */}
                    <div className="relative" ref={bellRef}>
                        <button
                            className="w-10 h-10 bg-white/15 border border-white/20 rounded-[10px] flex items-center justify-center text-white cursor-pointer transition-all duration-200 hover:bg-white/25 hover:-translate-y-px backdrop-blur-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] focus:outline-none relative"
                            onClick={toggleNotifications}
                            aria-label="Notifications"
                            aria-expanded={showNotifications}
                        >
                            <Bell size={19} />
                            {unreadAlerts > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1 border-2 border-purple-900">
                                    {unreadAlerts > 9 ? '9+' : unreadAlerts}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Notification Popover */}
                {showNotifications && !isMobile && (
                    <div
                        className="fixed right-6 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl z-[200] overflow-hidden animate-slide-in"
                        style={{ top: '160px' }}
                        ref={notifRef}
                    >
                        {/* Popover header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h3 className="text-base font-semibold text-gray-800 m-0">Notifications</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => markAllAlertsRead()}
                                    title="Mark all as read"
                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer border-none"
                                >
                                    <CheckCheck size={16} />
                                </button>
                                <button
                                    onClick={() => { clearAllAlerts(); setShowNotifications(false); }}
                                    title="Clear all"
                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer border-none"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Popover list */}
                        <div className="max-h-[400px] overflow-y-auto">
                            {alerts.length === 0 ? (
                                <div className="py-12 px-6 text-center text-gray-400">
                                    <span className="text-[32px] block mb-3">🔔</span>
                                    <p className="text-sm m-0">No notifications</p>
                                </div>
                            ) : (
                                alerts.slice(0, 10).map(a => (
                                    <div
                                        key={a.id}
                                        className={`flex items-start gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0 transition-colors duration-200 hover:bg-gray-50 ${!a.read ? 'bg-sky-50' : ''}`}
                                    >
                                        <span className="text-base flex-shrink-0 mt-0.5">{getAlertIcon(a.type)}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] text-gray-700 m-0 mb-1 leading-snug">{a.message}</p>
                                            <span className="text-[11px] text-gray-400">{formatAlertTime(a.timestamp)}</span>
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0">
                                            {!a.read && (
                                                <button
                                                    onClick={() => markAlertRead(a.id)}
                                                    title="Mark as read"
                                                    className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 cursor-pointer border-none bg-transparent"
                                                >
                                                    <Check size={14} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => clearAlert(a.id)}
                                                title="Remove"
                                                className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 cursor-pointer border-none bg-transparent"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Mobile Full-Screen Notification Panel */}
                {showNotifications && isMobile && (
                    <div
                        className="fixed inset-0 bg-black/60 z-[1000] flex items-end justify-center animate-fade-in"
                        onClick={() => setShowNotifications(false)}
                    >
                        <div
                            className="w-full max-h-[85vh] bg-white rounded-t-3xl flex flex-col overflow-hidden animate-slide-up"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Mobile header */}
                            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                                <h3 className="text-xl font-bold text-gray-800 m-0">Notifications</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors duration-200 cursor-pointer border-none"
                                        onClick={() => markAllAlertsRead()}
                                    >
                                        <CheckCheck size={18} />
                                        <span>Mark all read</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-1.5 px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-xs font-medium text-red-600 transition-colors duration-200 cursor-pointer border-none"
                                        onClick={() => { clearAllAlerts(); setShowNotifications(false); }}
                                    >
                                        <Trash2 size={18} />
                                        <span>Clear all</span>
                                    </button>
                                    <button
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 ml-2 transition-colors duration-200 cursor-pointer border-none"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Unread count bar */}
                            <div className="px-5 py-3 text-[13px] text-gray-500 bg-gray-50 flex-shrink-0">
                                {unreadAlerts > 0 ? `${unreadAlerts} unread notification${unreadAlerts > 1 ? 's' : ''}` : 'All caught up!'}
                            </div>

                            {/* Mobile list */}
                            <div className="flex-1 overflow-y-auto py-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                                {alerts.length === 0 ? (
                                    <div className="py-16 px-6 text-center">
                                        <div className="text-5xl mb-4">🔔</div>
                                        <p className="text-base font-semibold text-gray-700 m-0 mb-2">No notifications yet</p>
                                        <span className="text-sm text-gray-400">You're all caught up!</span>
                                    </div>
                                ) : (
                                    alerts.map(a => {
                                        const indicatorColor =
                                            a.type === 'critical' ? 'bg-red-500' :
                                                a.type === 'warning' ? 'bg-yellow-400' : 'bg-green-500';
                                        return (
                                            <div
                                                key={a.id}
                                                className={`flex items-start gap-3 px-5 py-4 border-b border-gray-50 last:border-0 ${!a.read ? 'bg-sky-50' : ''}`}
                                            >
                                                <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${indicatorColor}`} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[14px] text-gray-700 m-0 mb-1 leading-snug">{a.message}</p>
                                                    <span className="text-[12px] text-gray-400">{formatAlertTime(a.timestamp)}</span>
                                                </div>
                                                <div className="flex gap-1.5 flex-shrink-0">
                                                    {!a.read && (
                                                        <button
                                                            onClick={() => markAlertRead(a.id)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 cursor-pointer border-none bg-transparent"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => clearAlert(a.id)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors duration-200 cursor-pointer border-none bg-transparent"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
