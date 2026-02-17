/**
 * @module LoadingScreen
 * @description Multi-stage loading screen with progress bar and stage indicators.
 * Shows Auth → Connect → Ready pipeline during application initialisation.
 */

function LoadingScreen({ message = 'Loading...', stage = 'auth' }) {
    const stages = {
        init: { progress: 10 },
        auth: { progress: 40 },
        stomp: { progress: 70 },
        ready: { progress: 100 }
    };

    const currentStage = stages[stage] || stages.init;

    return (
        <div className="auth-screen">
            <div className="auth-card" style={{ maxWidth: '480px', padding: '48px 40px 56px' }}>
                {/* Logo */}
                <div className="auth-logo">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path d="M12 6v2M12 16v2M6 12h2M16 12h2" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="auth-title">Fabrix</h1>
                <p className="auth-subtitle">Fleet Management System</p>

                {/* Progress Bar */}
                <div className="auth-progress-track">
                    <div
                        className="auth-progress-bar"
                        style={{
                            width: `${currentStage.progress}%`,
                            animation: currentStage.progress < 100 ? 'auth-slide 1.6s ease-in-out infinite' : 'none'
                        }}
                    />
                </div>

                {/* Status Message */}
                <p className="auth-message">{message}</p>

                {/* Stage Indicators */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '40px'
                }}>
                    <StageIndicator
                        label="Auth"
                        active={stage === 'auth'}
                        complete={['stomp', 'ready'].includes(stage)}
                    />
                    <div style={{ width: '32px', height: '2px', background: '#E5E7EB', borderRadius: '2px' }} />
                    <StageIndicator
                        label="Connect"
                        active={stage === 'stomp'}
                        complete={['ready'].includes(stage)}
                    />
                    <div style={{ width: '32px', height: '2px', background: '#E5E7EB', borderRadius: '2px' }} />
                    <StageIndicator
                        label="Ready"
                        active={stage === 'ready'}
                        complete={false}
                    />
                </div>
            </div>
        </div>
    );
}

function StageIndicator({ label, active, complete }) {
    const getBackgroundStyle = () => {
        if (complete) {
            return {
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            };
        }
        if (active) {
            return {
                background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
                animation: 'stage-pulse 1.5s ease-in-out infinite'
            };
        }
        return {
            background: '#F3F4F6',
            color: '#9CA3AF',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        };
    };

    const getLabelStyle = () => {
        if (active) return { color: '#7C3AED', fontWeight: '600' };
        if (complete) return { color: '#10B981', fontWeight: '600' };
        return { color: '#9CA3AF', fontWeight: '500' };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                ...getBackgroundStyle()
            }}>
                {complete ? '✓' : active ? '⋯' : '○'}
            </div>
            <span style={{
                fontSize: '13px',
                transition: 'all 0.3s ease',
                letterSpacing: '0.01em',
                ...getLabelStyle()
            }}>
                {label}
            </span>
        </div>
    );
}

export default LoadingScreen;
