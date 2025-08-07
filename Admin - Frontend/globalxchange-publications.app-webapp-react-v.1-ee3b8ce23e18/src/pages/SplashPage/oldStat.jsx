<div
  style={{
    background: "#182542",
    height: "21vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 80px",
    opacity: !disableBack ? 1 : 0.2,
  }}
>
  {!loading && statistics ? (
    <div>
      <div className={classNames.title}>
        <CountUp end={allApps} duration={3} />
      </div>
      <div className={classNames.subtitle}>Apps</div>
    </div>
  ) : (
    <div className="skeleton" style={{ width: "300px" }}>
      <div className="skeleton-left">
        <div className="line" style={{ width: "100%", height: "20px" }}></div>
        <div className="line" style={{ width: "50%", height: "10px" }}></div>
      </div>
    </div>
  )}
  {!loading && totalAppUser ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={classNames.title}>
        <CountUp end={Math.floor(totalAppUser)} duration={3} />
      </div>
      <div className={classNames.subtitle}>Application Users</div>
    </div>
  ) : (
    <div
      className="skeleton"
      style={{
        width: "300px",
      }}
    >
      <div
        className="skeleton-left"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="line" style={{ width: "100%", height: "20px" }}></div>
        <div className="line" style={{ width: "50%", height: "10px" }}></div>
      </div>
    </div>
  )}
  {!loading && statistics ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={classNames.title}>
        $
        <CountUp
          end={convertCurrencySystem(fiatAsset)}
          duration={3}
          decimals={1}
        />
        {convertCurrencySystem1(fiatAsset)}
      </div>
      <div className={classNames.subtitle}>Fiat Assets</div>
    </div>
  ) : (
    <div className="skeleton" style={{ width: "300px" }}>
      <div
        className="skeleton-left"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="line" style={{ width: "100%", height: "20px" }}></div>
        <div className="line" style={{ width: "50%", height: "10px" }}></div>
      </div>
    </div>
  )}
  {!loading && statistics ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "end",
      }}
    >
      <div className={classNames.title}>
        $
        <CountUp
          end={convertCurrencySystem(cryptoAsset)}
          duration={3}
          decimals={1}
        />
        {convertCurrencySystem1(cryptoAsset)}
      </div>
      <div className={classNames.subtitle}>Crypto Assets</div>
    </div>
  ) : (
    <div className="skeleton" style={{ width: "300px" }}>
      <div
        className="skeleton-left"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <div className="line" style={{ width: "100%", height: "20px" }}></div>
        <div className="line" style={{ width: "50%", height: "10px" }}></div>
      </div>
    </div>
  )}
</div>;
