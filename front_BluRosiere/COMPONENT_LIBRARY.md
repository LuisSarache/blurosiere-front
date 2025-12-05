# 📚 Biblioteca de Componentes - BluRosiere

## 🎯 Componentes Disponíveis

### 📦 Base Components

#### Button
```jsx
<Button variant="primary" size="lg" leftIcon={<Icon />} loading>
  Click me
</Button>
```
**Variantes:** primary, secondary, outline, ghost, danger  
**Tamanhos:** xs, sm, md, lg, xl

#### Input
```jsx
<Input
  label="Email"
  leftIcon={<Mail />}
  error="Campo obrigatório"
  helperText="Digite seu email"
/>
```

#### Card
```jsx
<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter>Rodapé</CardFooter>
</Card>
```

#### Badge
```jsx
<Badge variant="success">Ativo</Badge>
<StatusBadge status="online">Online</StatusBadge>
```

#### Avatar
```jsx
<Avatar src="/avatar.jpg" name="User" size="lg" status="online" />
<AvatarGroup max={3}>
  <Avatar name="User 1" />
  <Avatar name="User 2" />
</AvatarGroup>
```

### 🎨 Navigation

#### Tabs
```jsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Breadcrumb
```jsx
<Breadcrumb items={[
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Usuários', href: '/users' },
  { label: 'Detalhes' }
]} />
```

#### Stepper
```jsx
<Stepper
  currentStep={1}
  steps={[
    { label: 'Passo 1', description: 'Descrição' },
    { label: 'Passo 2' },
    { label: 'Passo 3' }
  ]}
/>
```

### 📊 Data Display

#### DataTable
```jsx
<DataTable
  data={users}
  columns={[
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <Badge>{value}</Badge>
    }
  ]}
  searchable
  sortable
  pagination
/>
```

#### Timeline
```jsx
<Timeline>
  <TimelineItem
    icon={Check}
    title="Evento 1"
    description="Descrição"
    date="01/01/2024"
    variant="success"
  />
</Timeline>
```

#### Chart
```jsx
<Chart
  type="bar"
  data={chartData}
  dataKey="value"
  nameKey="month"
  height={300}
/>

<Chart type="line" data={data} />
<Chart type="pie" data={data} />
```

#### StatsCard
```jsx
<StatsCard
  title="Total Usuários"
  value="1,234"
  change="+12%"
  trend="up"
  icon={Users}
/>
```

### 🎭 Feedback

#### Modal
```jsx
<Modal isOpen={isOpen} onClose={onClose} size="lg" title="Título">
  Conteúdo do modal
</Modal>
```

#### Drawer
```jsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  size="md"
  title="Configurações"
>
  Conteúdo do drawer
</Drawer>
```

#### Alert
```jsx
<Alert variant="success" title="Sucesso">
  Operação realizada com sucesso
</Alert>
```

#### Toast
```jsx
import toast from 'react-hot-toast';

toast.success('Sucesso!');
toast.error('Erro!');
toast.loading('Carregando...');
```

#### LoadingSpinner
```jsx
<LoadingSpinner variant="icon" size="lg" />
<PageLoader message="Carregando..." />
<SectionLoader />
```

#### ProgressBar
```jsx
<ProgressBar value={75} max={100} showLabel />
<CircularProgress value={75} size={64} showLabel />
```

### 🎯 Interactive

#### Accordion
```jsx
<Accordion type="single">
  <AccordionItem value="1" trigger="Item 1">
    Conteúdo 1
  </AccordionItem>
  <AccordionItem value="2" trigger="Item 2">
    Conteúdo 2
  </AccordionItem>
</Accordion>
```

#### Dropdown
```jsx
<Dropdown
  trigger={<Button>Menu</Button>}
  items={[
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' }
  ]}
  onSelect={(item) => console.log(item)}
/>
```

#### Select
```jsx
<Select
  value={value}
  onChange={setValue}
  options={[
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' }
  ]}
  placeholder="Selecione..."
/>
```

#### SearchBar
```jsx
<SearchBar
  onSearch={handleSearch}
  suggestions={['Sugestão 1', 'Sugestão 2']}
  loading={isLoading}
/>
```

#### CommandPalette
```jsx
<CommandPalette
  isOpen={isOpen}
  onClose={onClose}
  commands={[
    {
      id: 'home',
      label: 'Ir para Home',
      icon: Home,
      action: () => navigate('/'),
      shortcut: 'Ctrl+H'
    }
  ]}
/>
```

### 🎨 Layout

#### Container
```jsx
<Container size="lg">Conteúdo</Container>
```

#### Grid
```jsx
<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

#### Stack
```jsx
<Stack spacing="lg" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

#### Flex
```jsx
<Flex justify="between" align="center" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>
```

### 📝 Typography

#### Headings
```jsx
<H1 color="gradient">Título Principal</H1>
<H2 weight="semibold">Subtítulo</H2>
<H3 color="muted">Seção</H3>
```

#### Text
```jsx
<Lead>Texto de destaque</Lead>
<Paragraph>Parágrafo normal</Paragraph>
<Text size="sm" color="muted">Texto pequeno</Text>
<Caption>Legenda</Caption>
```

### 🎯 Utility

#### EmptyState
```jsx
<EmptyState
  icon={Inbox}
  title="Nenhum item encontrado"
  description="Adicione seu primeiro item"
  action={handleAdd}
  actionLabel="Adicionar Item"
/>
```

#### Tooltip
```jsx
<Tooltip content="Informação adicional" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

#### VirtualList
```jsx
<VirtualList
  items={largeArray}
  itemHeight={50}
  containerHeight={400}
  renderItem={(item) => <div>{item.name}</div>}
/>
```

## 🎣 Hooks Disponíveis

### useTheme
```jsx
const { theme, toggleTheme, setTheme } = useTheme();
```

### useKeyboard
```jsx
useKeyboard({
  'ctrl+k': () => openCommand(),
  'escape': () => closeModal()
});
```

### useMediaQuery
```jsx
const isMobile = useMediaQuery('(max-width: 640px)');
const { isMobile, isTablet, isDesktop } = useBreakpoint();
```

### useIntersectionObserver
```jsx
const { ref, isIntersecting, hasIntersected } = useIntersectionObserver();
```

### useDebounce
```jsx
const debouncedValue = useDebounce(searchQuery, 500);
```

### useLocalStorage
```jsx
const [value, setValue] = useLocalStorage('key', defaultValue);
```

## 🎨 Animações

### Variants
```jsx
import { fadeIn, slideUp, scaleIn } from '@/utils/animations';

<motion.div variants={fadeIn} initial="initial" animate="animate">
  Conteúdo
</motion.div>
```

### Transitions
```jsx
import { spring, smooth, bouncy } from '@/utils/animations';

<motion.div transition={spring}>Conteúdo</motion.div>
```

## 🎯 Utilitários

### cn (Class Names)
```jsx
import { cn } from '@/utils/cn';

<div className={cn('base-class', isActive && 'active-class')}>
```

### Formatters
```jsx
import { formatDate, formatCurrency } from '@/utils/formatters';

formatDate(new Date());
formatCurrency(1234.56);
```

## 📱 Responsividade

Todos os componentes são responsivos por padrão:
- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Áreas de toque adequadas
- **Adaptive**: Layout se adapta ao dispositivo

## ♿ Acessibilidade

Todos os componentes seguem:
- **WCAG 2.1 Level AA**
- **ARIA Labels** apropriados
- **Keyboard Navigation** completa
- **Screen Reader** friendly
- **Focus Management** automático

## 🚀 Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Code Splitting**: Chunks otimizados
- **Memoization**: Re-renders minimizados
- **Virtual Scrolling**: Para grandes listas
- **Debouncing**: Em buscas e inputs