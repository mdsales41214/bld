<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment Successful - BuyLeadData</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        .success-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 3rem;
            border-radius: 20px;
            max-width: 500px;
        }
        h1 { color: #00D4FF; }
        .checkmark {
            font-size: 4rem;
            color: #00D4FF;
            margin-bottom: 1rem;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #0A84FF 0%, #00D4FF 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="checkmark">✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. You will receive an email with your download link shortly.</p>
        <p>Order ID: <?php echo htmlspecialchars($_GET['session_id'] ?? ''); ?></p>
        <a href="/" class="btn">Return to Homepage</a>
    </div>
</body>
</html>